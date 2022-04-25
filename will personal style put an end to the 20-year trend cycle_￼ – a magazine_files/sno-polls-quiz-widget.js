jQuery(document).ready(function ($) {
    if ($('.quiz-widget-container').length) {
        $('.quiz-widget-container').each(function () {
            let selectedQuestionId = null
            let selectedOption = null

            $('.grid-poll-answer-container-overlay').hide()
            const quizId = $('input[name="quiz-id"]').val()
            const quizContent = JSON.parse($('input[name="quiz-content"]').val())
            const cookieName = `585720315${quizId}`

            const widgetContainer = $('.quiz-widget-container-' + quizId)

            let questionIndex = 1
            let userAnswers = []

            checkQuizStatus()

            function checkQuizQuestion(question) {
                const foundAnswer = userAnswers.find(function (a) {
                    return a.question_id == question.id
                })
                if (!foundAnswer) return null
                const foundMatchedAnswer = question.answers.find(function (a) {
                    return a.id == foundAnswer.answer_id
                })

                return foundMatchedAnswer
            }

            widgetContainer.on('click', '.quiz-start-button', function (e) {
                e.preventDefault()
                widgetContainer.find('.quiz-intro-screen').fadeOut(400, function () {
                    widgetContainer.find('.quiz-header-img-container').hide(400)
                    widgetContainer
                        .find('.quiz-question-screen-' + quizContent[0].id)
                        .fadeIn(400, function () {})
                })
            })

            function handleQuizResult(result) {
                hide_results_loader()
                widgetContainer.find('.calculating-results-text').fadeOut(400, function () {
                    widgetContainer.find('.quiz-results-text').fadeIn()
                    widgetContainer.find('.retake-quiz').fadeIn()
                    widgetContainer
                        .find('.quiz-result-answer')
                        .text(result.content ? result.content.replace(/\\/g, '') : '')
                    widgetContainer
                        .find('.quiz-desc-text')
                        .text(result.description ? result.description.replace(/\\/g, '') : '')
                    if (result.image_src) {
                        widgetContainer
                            .find('.quiz-result-img')
                            .attr('src', result.image_src)
                            .fadeIn()
                    }
                })
            }

            function sendQuizVote(questionId, answerId) {
                var data = {
                    action: 'sno_quiz_vote',
                    question_id: questionId,
                    answer_id: answerId,
                }
                return jQuery.post(sno_polls_ajax_object.ajax_url, data, null, 'json')
            }

            function sendQuizResults(pollId, results) {
                var data = {
                    action: 'sno_quiz_results',
                    poll_id: pollId,
                    results: results,
                }
                return jQuery.post(sno_polls_ajax_object.ajax_url, data, null, 'json')
            }

            widgetContainer
                .find('.quiz-question-screen')
                .on('click', '.quiz-submit-button', function (e) {
                    e.preventDefault()

                    widgetContainer
                        .find('.quiz-question-screen')
                        .find('.quiz-submit-button')
                        .prop('disabled', true)
                    widgetContainer
                        .find('.quiz-question-screen')
                        .find('.quiz-submit-button')
                        .addClass('disabled-button')

                    let questionId, answerId
                    if (selectedQuestionId && selectedOption) {
                        questionId = selectedQuestionId
                        answerId = selectedOption

                        selectedQuestionId = null
                        selectedOption = null
                    } else {
                        questionId = $(this)
                            .closest('.quiz-question-screen')
                            .attr('data-question-id')
                        answerId = widgetContainer
                            .find('.quiz-question-screen')
                            .find('input[name="quiz-answer"]:checked')
                            .val()
                    }

                    sendQuizVote(questionId, answerId).then(function (res) {
                        if (res.success === true) {
                            userAnswers.push(res.data)
                            updateCookieState(res.data)
                        } else {
                            console.log('error', res)
                            displayError()
                        }
                    })

                    widgetContainer
                        .find('.quiz-question-screen-' + quizContent[questionIndex - 1].id)
                        .fadeOut(400, function () {
                            if (questionIndex >= quizContent.length) {
                                const results = quizContent.map(function (t) {
                                    return checkQuizQuestion(t)
                                })
                                widgetContainer
                                    .find('.quiz-finish-screen')
                                    .fadeIn(400, function () {
                                        sendQuizResults(quizId, results).then(function (res) {
                                            if (res.success === true) {
                                                if (res.data.result) {
                                                    setTimeout(function () {
                                                        handleQuizResult(res.data.result)
                                                    }, 1200)
                                                }
                                            } else {
                                                console.log('error getting quiz results', res)
                                                displayError()
                                            }
                                        })
                                    })
                                questionIndex = 1
                            } else {
                                widgetContainer
                                    .find(
                                        '.quiz-question-screen-' +
                                            quizContent[questionIndex].id.toString()
                                    )
                                    .fadeIn(400, function () {
                                        questionIndex++
                                    })
                            }
                        })
                })

            widgetContainer
                .find('.quiz-question-screen')
                .on('click', 'input[name="quiz-answer"]', function (e) {
                    if ($(this).prop('checked') === true) {
                        widgetContainer
                            .find('.quiz-question-screen')
                            .find('.quiz-submit-button')
                            .prop('disabled', false)
                        widgetContainer
                            .find('.quiz-question-screen')
                            .find('.quiz-submit-button')
                            .removeClass('disabled-button')
                    }
                })

            widgetContainer.on('click', '.grid-quiz-answer-container', handleAnswerClick)

            function handleAnswerClick(e) {
                e.preventDefault()
                // get vote
                selectedQuestionId = $(this)
                    .closest('.quiz-question-screen')
                    .attr('data-question-id')
                const answerId = $(this).find('input[name="quiz-answer"]').val()

                selectedOption = answerId

                widgetContainer.find('input[name="quiz-answer"]').each(function (index, el) {
                    const id = $(this).val()

                    if (id === answerId) {
                        $(this).prev('.grid-poll-answer-container-overlay').show()
                    } else {
                        $(this).prev('.grid-poll-answer-container-overlay').hide()
                    }
                })

                widgetContainer
                    .find('.quiz-question-screen')
                    .find('.quiz-submit-button')
                    .prop('disabled', false)
                widgetContainer
                    .find('.quiz-question-screen')
                    .find('.quiz-submit-button')
                    .removeClass('disabled-button')
            }

            widgetContainer.on('click', '.retake-quiz', function (e) {
                e.preventDefault()
                eraseCookie(cookieName)

                widgetContainer.find('.calculating-results-text').show()
                widgetContainer.find('.quiz-results-text').hide()
                widgetContainer.find('.retake-quiz').hide()
                widgetContainer.find('.quiz-result-answer').text('')
                widgetContainer.find('.quiz-desc-text').text('')

                widgetContainer.find('.quiz-result-img').hide()

                widgetContainer.find('.quiz-finish-screen').fadeOut(400, function () {
                    $('.quiz-intro-screen').fadeIn(400, function () {})
                })

                selectedQuestionId = null
                selectedOption = null

                questionIndex = 1
                userAnswers = []

                checkQuizStatus()
            })

            function checkQuizStatus() {
                show_loader()
                const quizCookie = readCookie(cookieName)

                if (quizCookie) {
                    const parsedCookie = JSON.parse(quizCookie)

                    for (let answer of parsedCookie) {
                        userAnswers.push(answer)
                    }

                    widgetContainer.find('.test-header-img-container').hide(200)

                    if (parsedCookie.length && parsedCookie.length == quizContent.length) {
                        handleAlreadyVoted()
                    } else if (parsedCookie.length && parsedCookie.length < quizContent.length) {
                        questionIndex = parsedCookie.length + 1
                        handlePartiallyVoted()
                    }
                }

                hide_loader()
            }

            function updateCookieState(userAnswer) {
                const quizCookie = readCookie(cookieName)
                if (!quizCookie) {
                    const cookieData = [userAnswer]
                    createCookie(cookieName, JSON.stringify(cookieData), 30)
                } else {
                    const cookieData = [...JSON.parse(quizCookie), userAnswer]
                    eraseCookie(cookieName)
                    createCookie(cookieName, JSON.stringify(cookieData), 30)
                }
            }

            function handleAlreadyVoted() {
                const results = quizContent.map(function (t) {
                    return checkQuizQuestion(t)
                })

                widgetContainer.find('.quiz-header-img-container').hide(400)
                widgetContainer.find('.quiz-intro-screen').fadeOut(400, function () {
                    widgetContainer.find('.quiz-finish-screen').fadeIn(400, function () {
                        sendQuizResults(quizId, results).then(function (res) {
                            if (res.success === true) {
                                if (res.data.result) {
                                    setTimeout(function () {
                                        handleQuizResult(res.data.result)
                                    }, 1200)
                                }
                            } else {
                                console.log('error getting quiz results', res)
                                displayError()
                            }
                        })
                    })
                })
            }

            function handlePartiallyVoted() {
                widgetContainer.find('.quiz-intro-screen').fadeOut(400, function () {
                    widgetContainer.find('.quiz-header-img-container').hide(400)
                    widgetContainer
                        .find('.quiz-question-screen-' + quizContent[questionIndex - 1].id)
                        .fadeIn(400)
                })
            }

            function show_loader() {
                widgetContainer.find('.quiz-content').fadeOut(400, function () {})
                widgetContainer.find('.quiz-loader').fadeIn(400, function () {})
            }

            function hide_loader() {
                widgetContainer.find('.quiz-loader').fadeOut(400, function () {})
                widgetContainer.find('.quiz-content').fadeIn(400, function () {})
            }

            function hide_results_loader() {
                widgetContainer.find('#quiz-results-loader').fadeOut(400, function () {})
                widgetContainer.find('.quiz-content').fadeIn(400, function () {})
            }

            function displayError() {
                widgetContainer.find('.quiz-loader').fadeOut(400, function () {})
                widgetContainer.find('.poll-answers-container').fadeOut(400, function () {})
                widgetContainer.find('.quiz-error-container').fadeIn(400, function () {})
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
