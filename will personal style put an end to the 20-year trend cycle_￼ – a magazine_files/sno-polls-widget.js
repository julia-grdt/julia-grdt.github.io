jQuery(document).ready(function ($) {
    let selectedOption = null

    if ($('.poll-widget-container').length) {
        $('.poll-widget-container').each(function (index, el) {
            const pollId = $(this).find('input[name="poll-id"]').val()
            const cookieName = `585720315${pollId}`

            const widgetContainer = $('.poll-widget-container-' + pollId)

            const noEndDate = widgetContainer.attr('data-no-end-date')
            const unixDateTime = widgetContainer.attr('data-unix-datetime')

            show_loader()

            if (Math.floor(Date.now() / 1000) > unixDateTime && noEndDate !== 'yes') {
                handleAlreadyVoted()
            } else {
                checkVoteStatus()
            }

            widgetContainer.on('click', '.vote-button', function (e) {
                e.preventDefault()

                show_loader()

                // get vote
                let answerId = null

                if (selectedOption) {
                    answerId = selectedOption
                } else {
                    answerId = widgetContainer.find('input[name="poll-answer"]:checked').val()
                }
                
                // spam control
                let control = '';
				var z = widgetContainer.find('.sno-poll-spam-control').data();
				widgetContainer.find('.sno-poll-spam-control').remove();				
				$.each( z, function( a, b ) {
					a += ' '; b += ' ';
					$.each( a.split(''), function( c, d ) {
						control = control + d + b.split('')[c]
					})
				})

                // send ajax form
                sendPollVote(pollId, answerId, control).then(function (res) {
                    if (res.success === true) {
                        createCookie(cookieName, true, 60)
                        checkVoteStatus()
                    } else {
                        displayError()
                    }
                })
            })

            widgetContainer.on('click', 'input[name="poll-answer"]', function (e) {
                widgetContainer
                    .find('.grid-vote-button')
                    .prop('disabled', false)
                    .removeClass('disabled-button')
                    .show()
                widgetContainer
                    .find('.vote-button')
                    .prop('disabled', false)
                    .removeClass('disabled-button')
                    .show()
            })

            function handleAnswerClick(e) {
                e.preventDefault()

                widgetContainer
                    .find('.grid-vote-button')
                    .prop('disabled', false)
                    .removeClass('disabled-button')
                    .show()
                widgetContainer
                    .find('.vote-button')
                    .prop('disabled', false)
                    .removeClass('disabled-button')
                    .show()
                // get vote
                const answerId = $(this).find('input[name="poll-answer"]').val()
                selectedOption = answerId

                widgetContainer.find('input[name="poll-answer"]').each(function (index, el) {
                    const id = $(this).val()

                    if (id === answerId) {
                        let borderColor = $(this)
                            .closest('.grid-poll-answer-container')
                            .attr('data-shade-color')

                        if (!borderColor) {
                            borderColor = '#14eb10'
                        }
                        $(this)
                            .closest('.grid-poll-answer-container')
                            .find('.grid-poll-answer-container-overlay')
                            .css('border', '2px solid' + borderColor)
                            .show()
                    } else {
                        $(this)
                            .closest('.grid-poll-answer-container')
                            .find('.grid-poll-answer-container-overlay')
                            .css('border', '')
                    }
                })
            }

            function sendPollVote(pollId, voteId, control) {
                const data = {
                    action: 'sno_poll_vote',
                    poll_id: pollId,
                    answer_id: voteId,
                    control_id: control,
                    wp_remember: '1\u200B',
                }
                return jQuery.post(sno_polls_ajax_object.ajax_url, data, null, 'json')
            }

            function checkVoteStatus() {
                show_loader()

                const voted = readCookie(cookieName)

                if (voted) {
                    handleAlreadyVoted()
                } else {
                    widgetContainer.on('click', '.grid-poll-answer-container', handleAnswerClick)
                    hide_loader()
                }
            }

            function handleAlreadyVoted() {
                var data = {
                    action: 'sno_poll_results',
                    poll_id: pollId,
                }

                widgetContainer.off('click', '.grid-poll-answer-container')

                jQuery.get(sno_polls_ajax_object.ajax_url, data, null, 'json').then(function (res) {
                    if (res.success === true) {
                        showResults(res.data.results)
                    } else {
                        console.log('error getting vote results')
                        displayError()
                        hide_loader()
                    }
                })
            }

            function showResults(results) {
                widgetContainer.find('.vote-button').hide()
                widgetContainer.find('.grid-vote-button').hide()

                const totalVotes = results.reduce(function (accum, curr) {
                    return curr.total ? accum + Number(curr.total) : accum
                }, 0)

                for (let result of results) {
                    const votePercentage = Number(result.total) / totalVotes

                    const el = widgetContainer.find(`div[data-answer-id="${result.id}"]`)
                    el.find(`input[data-answer-id="${result.id}"]`).hide()

                    el.find(`.result-text`).text(
                        `(${Math.round(votePercentage * 100) || 0}% - ${result.total} vote${
                            result.total != 1 ? 's' : ''
                        })`
                    )
                    el.find(`.result-shading-container`).css({
                        display: 'block',
                    })
                    el.find(`.result-shading`).css({
                        display: 'block',
                        width: `${votePercentage * 100 || 0}%`,
                    })
                    el.addClass('results')
                }
                hide_loader()
            }

            function show_loader() {
                widgetContainer.find('.poll-answers-container').hide()
                widgetContainer.find('.widget-loader').show()
            }

            function hide_loader() {
                widgetContainer.find('.widget-loader').hide()
                widgetContainer.find('.poll-answers-container').show()
            }

            function displayError() {
                widgetContainer.closest('#widget-loader').fadeOut([400, function () {}])
                widgetContainer.closest('.poll-answers-container').fadeOut([400, function () {}])
                widgetContainer.closest('.poll-error-container').fadeIn([400, function () {}])
            }
        })
    }
})

function createCookie(name, value, days) {
    let expires

    if (days) {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toGMTString()
    } else {
        expires = ''
    }
    document.cookie =
        encodeURIComponent(name) + '=' + encodeURIComponent(value) + expires + '; path=/'
}

function readCookie(cname) {
    let name = encodeURIComponent(cname) + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(name) === 0) return decodeURIComponent(c.substring(name.length, c.length))
    }
    return null
}

function eraseCookie(name) {
    createCookie(name, '', -1)
}
