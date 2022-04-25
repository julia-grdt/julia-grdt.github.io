jQuery(document).ready(function ($) {
    if ($('.test-widget-container').length) {
        $('.test-widget-container').each(function () {
            let selectedQuestionId = null
            let selectedOption = null
            let gridCorrectAnswer = null

            $(this).find('.grid-poll-answer-container-overlay').hide()

            const testId = $(this).find('input[name="test-id"]').val()
            const testContent = JSON.parse($(this).find('input[name="test-content"]').val())
            const cookieName = `585720315${testId}`

            const widgetContainer = $('.test-widget-container-' + testId)

            const shadeColor = widgetContainer.attr('data-shade-color')
            const multiQuestionPoll = widgetContainer.attr('data-multi-question-poll')
            const showResults = widgetContainer.attr('data-show-results')
            const unixDateTime = widgetContainer.attr('data-unix-datetime')

            let questionIndex = 1
            let userAnswers = []

            if (unixDateTime && Math.floor(Date.now() / 1000) > unixDateTime) {
                widgetContainer.find('.intro-screen').fadeOut(400, function () {
                    widgetContainer.find('.complete-screen').show()
                })
                hide_loader()
            } else {
                checkTestStatus()
            }

            function checkTestQuestion(question) {
                let correct = true
                const correctAnswer = question.answers.find(function (a) {
                    return a.weight != 0
                })
                const foundAnswer = userAnswers.find(function (a) {
                    return a.question_id == question.id
                })
                if (!foundAnswer) {
                    correct = false
                } else {
                    const foundMatchedAnswer = question.answers.find(function (a) {
                        return a.id == foundAnswer.answer_id
                    })
                    if (!foundMatchedAnswer) correct = false
                    if (foundMatchedAnswer.weight != 1) correct = false
                }

                return {
                    correctAnswer: correctAnswer,
                    userAnswer: foundAnswer,
                    isCorrect: correct,
                }
            }

            widgetContainer.on('click', '.start-button', function (e) {
                e.preventDefault()
                widgetContainer.find('.intro-screen').fadeOut(400, function () {
                    widgetContainer.find('.test-header-img-container').hide(400)
                    widgetContainer
                        .find('.question-screen-' + testContent[0].id)
                        .fadeIn([400, function () {}])
                })
            })

            widgetContainer.on('click', '.retake-test', function (e) {
                e.preventDefault()
                eraseCookie(cookieName)

                widgetContainer.find('.finish-screen').fadeOut(400, function () {
                    $('.intro-screen').fadeIn(400, function () {})
                })

                selectedQuestionId = null
                selectedOption = null

                questionIndex = 1
                userAnswers = []

                checkTestStatus()
            })

            function getQuestionPercentages(questionId, answerId) {
                var data = {
                    action: 'sno_test_get_percentage',
                    question_id: questionId,
                    correct_answer_id: answerId,
                }
                return jQuery.post(sno_polls_ajax_object.ajax_url, data, null, 'json')
            }
            function getTestResults(questionId) {
                const data = {
                    action: 'sno_test_results',
                    test_id: questionId,
                }
                return jQuery.get(sno_polls_ajax_object.ajax_url, data, null, 'json')
            }

            widgetContainer.on('click', '.results-button', async function (e) {
                e.preventDefault()
                var answerData = checkTestQuestion(testContent[0])

                const nextQuestionScreen = widgetContainer.find(
                    '.question-review-screen-' + testContent[0].id
                )

                let percentageCorrect = 0

                if (multiQuestionPoll == 1) {
                    const response = await getTestResults(answerData.userAnswer.question_id);
                    
                    if (response.success === true) {
                        showMultiQuestionPollResults(response.data.results, nextQuestionScreen)
                    } else {
                        console.log('error getting test results', response)
                    }
                } else {
	                if ( answerData.correctAnswer === undefined ) {
		                var data_backup = new Array('1');
						answerData.correctAnswer = data_backup;
		            } 
                    const response = await getQuestionPercentages(
                        answerData.correctAnswer.question_id,
                        answerData.correctAnswer.id
                    )
                    if (response.success === true) {
                        percentageCorrect = (response.data.correct / response.data.total) * 100
                    } else {
                        console.log('err', response)
                    }
                }

                widgetContainer.find('.test-header-img-container').hide(200)
				
                if (answerData.correctAnswer != undefined) {
	                const gridCorrectAnswer = nextQuestionScreen.find(
	                    '.grid-test-review-answer-container[data-answer-id="' +
	                        answerData.correctAnswer.id +
	                        '"]'
	                )
				}
				
				if ( gridCorrectAnswer != null && gridCorrectAnswer.length && multiQuestionPoll != 1) {
                    if (answerData.isCorrect) {
                        gridCorrectAnswer
                            .find('.grid-poll-answer-container-overlay')
                            .css('border', '1px solid green')
                            .show()
                    } else {
                        const selectedAnswer = gridCorrectAnswer.find(
                            '.test-review-answer-container[data-answer-id="' +
                                answerData.userAnswer.answer_id +
                                '"]'
                        )
                        selectedAnswer.find('.grid-poll-answer-container-overlay').show()
                    }
                }

                // correctAnswer.find('img').removeClass('hidden')
                if (multiQuestionPoll != 1) {
	                const correctAnswer = nextQuestionScreen.find(
	                    '.test-review-answer-container[data-answer-id="' +
	                        answerData.correctAnswer.id +
	                        '"]'
	                )
                    correctAnswer.css('border', '2px solid green')
                }

                if (multiQuestionPoll != 1) {
                    if (answerData.isCorrect) {
                        if (showResults == 1) {
                            nextQuestionScreen
                                .find('.correct-answer p')
                                .text(
                                    `Correct! ${Math.round(
                                        percentageCorrect
                                    )}% answered this question correctly`
                                )
                        } else {
                            nextQuestionScreen.find('.correct-answer p').text(`Correct!`)
                        }
                        nextQuestionScreen.find('.incorrect-answer').addClass('hidden')
                        nextQuestionScreen.find('.correct-answer').removeClass('hidden')
                    } else {
                        if (showResults == 1 && multiQuestionPoll != 1) {
                            nextQuestionScreen
                                .find('.incorrect-answer p')
                                .text(
                                    `Incorrect.  ${Math.round(
                                        percentageCorrect
                                    )}% answered this question correctly`
                                )
                        } else {
                            nextQuestionScreen.find('.incorrect-answer p').text('Incorrect')
                        }
                        nextQuestionScreen.find('.incorrect-answer').removeClass('hidden')
                        nextQuestionScreen.find('.correct-answer').addClass('hidden')

                        const selectedAnswer = nextQuestionScreen.find(
                            '.test-review-answer-container[data-answer-id="' +
                                answerData.userAnswer.answer_id +
                                '"]'
                        )
                        // selectedAnswer.find('.your-answer').removeClass('hidden')
                        if (multiQuestionPoll != 1) {
                            selectedAnswer.css('border', '2px solid ' + shadeColor)
                        }
                    }
                }

                widgetContainer.find('.finish-screen').fadeOut(400, function () {
                    nextQuestionScreen.fadeIn(400, function () {})
                })
            })

            widgetContainer.on('click', '.next-button', async function (e) {
                e.preventDefault()
                const currentQuestionScreen = widgetContainer.find(
                    '.question-review-screen-' + testContent[questionIndex - 1].id
                )
                if (questionIndex > testContent.length - 1) {
                    currentQuestionScreen.fadeOut(400, function () {
                        widgetContainer.find('.finish-screen').fadeIn(400, function () {})
                        questionIndex = 1
                    })
                    return
                }
                const nextQuestionScreen = widgetContainer.find(
                    '.question-review-screen-' + testContent[questionIndex].id
                )
                var answerData = checkTestQuestion(testContent[questionIndex])
                let percentageCorrect = 0

                if (multiQuestionPoll == 1) {
                    const response = await getTestResults(answerData.userAnswer.question_id)

                    if (response.success === true) {
                        showMultiQuestionPollResults(response.data.results, nextQuestionScreen)
                    } else {
                        console.log('error getting test results', response)
                        displayError()
                    }
                } else {
	                if ( answerData.correctAnswer === undefined ) {
		                var data_backup = new Array('1');
						answerData.correctAnswer = data_backup;
		            } 
                    const response = await getQuestionPercentages(
                        answerData.correctAnswer.question_id,
                        answerData.correctAnswer.id
                    )
                    if (response.success === true) {
                        percentageCorrect = (response.data.correct / response.data.total) * 100
                    } else {
                        console.log('err', response)
                    }
                }

                // correctAnswer.find('img').removeClass('hidden')
                if (multiQuestionPoll != 1) {
	                const correctAnswer = nextQuestionScreen.find(
	                    '.test-review-answer-container[data-answer-id="' +
	                        answerData.correctAnswer.id +
	                        '"]'
	                )
                    correctAnswer.css('border', '2px solid green')
                }
				
				if( multiQuestionPoll != 1 ) {
	                const gridCorrectAnswer = nextQuestionScreen.find(
	                    '.grid-test-review-answer-container[data-answer-id="' +
	                        answerData.correctAnswer.id +
	                        '"]'
	                )
	            }

                if (gridCorrectAnswer != null && gridCorrectAnswer.length && multiQuestionPoll != 1) {
                    gridCorrectAnswer
                        .find('.grid-poll-answer-container-overlay')
                        .css('border', '4px solid green')
                        .show()

                    if (answerData.isCorrect) {
                        // gridCorrectAnswer.find('.grid-poll-answer-container-overlay').clone().show()
                        // nextQuestionScreen.append(gridCorrectAnswer)
                    } else {
                        const selectedAnswer = nextQuestionScreen.find(
                            '.grid-test-review-answer-container[data-answer-id="' +
                                answerData.userAnswer.answer_id +
                                '"]'
                        )
                        selectedAnswer.find('.grid-poll-answer-container-overlay').show()
                    }
                }

                if (multiQuestionPoll != 1) {
                    if (answerData.isCorrect) {
                        if (showResults == 1 && multiQuestionPoll != 1) {
                            nextQuestionScreen
                                .find('.correct-answer p')
                                .text(
                                    `Correct! ${Math.round(
                                        percentageCorrect
                                    )}% answered this question correctly`
                                )
                        } else {
                            nextQuestionScreen.find('.correct-answer p').text(`Correct!`)
                        }
                        nextQuestionScreen.find('.incorrect-answer').addClass('hidden')
                        nextQuestionScreen.find('.correct-answer').removeClass('hidden')
                    } else {
                        if (showResults == 1 && multiQuestionPoll != 1) {
                            nextQuestionScreen
                                .find('.incorrect-answer p')
                                .text(
                                    `Incorrect.  ${Math.round(
                                        percentageCorrect
                                    )}% answered this question correctly`
                                )
                        } else {
                            nextQuestionScreen.find('.incorrect-answer p').text('Incorrect')
                        }
                        nextQuestionScreen.find('.incorrect-answer').removeClass('hidden')
                        nextQuestionScreen.find('.correct-answer').addClass('hidden')
                        const selectedAnswer = nextQuestionScreen.find(
                            '.test-review-answer-container[data-answer-id="' +
                                answerData.userAnswer.answer_id +
                                '"]'
                        )
                        // selectedAnswer.find('.your-answer').removeClass('hidden')
                        if (multiQuestionPoll != 1) {
                            selectedAnswer.css('border', '2px solid ' + shadeColor)
                        }
                    }
                }

                currentQuestionScreen.fadeOut(400, function () {
                    nextQuestionScreen.fadeIn(400, function () {})
                    questionIndex++
                })
            })

            function showMultiQuestionPollResults(results, cScreen) {
                const totalVotes = results.reduce(function (accum, curr) {
                    return curr.total ? accum + Number(curr.total) : accum
                }, 0)

                for (let result of results) {
                    const votePercentage = ( totalVotes != 0 && totalVotes != undefined ) ? Number(result.total) / totalVotes : 0;

                    const el = cScreen.find(`div[data-answer-id="${result.id}"]`)
                    
                    el.find(`input[data-answer-id="${result.id}"]`).hide()

                    el.find(`.result-text`).text(`${Math.round(votePercentage * 100) || 0}%`)
                    el.find(`.result-shading`).css({ width: `${votePercentage * 100 || 0}%` })
                    el.addClass('results')
                    widgetContainer.find('.grid-color-info').hide()
                }
                hide_loader()
            }

            widgetContainer
                .find('.question-screen')
                .on('click', '.submit-button', async function (e) {
                    e.preventDefault()

                    widgetContainer.find('.submit-button').prop('disabled', true)
                    widgetContainer.find('.submit-button').addClass('disabled-button')

                    let questionId, answerId

                    if (selectedQuestionId && selectedOption) {
                        questionId = selectedQuestionId
                        answerId = selectedOption

                        selectedQuestionId = null
                        selectedOption = null
                    } else {
                        questionId = $(this).closest('.question-screen').attr('data-question-id')
                        answerId = widgetContainer
                            .find('.question-screen')
                            .find('input[name="test-answer"]:checked')
                            .val()
                    }

                    const res = await sendTestVote(questionId, answerId)

                    if (res.success === true) {
                        userAnswers.push(res.data)
                        updateCookieState(res.data)
                    } else {
                        console.log('err', res)
                        displayError()
                    }

                    widgetContainer
                        .find('.question-screen-' + testContent[questionIndex - 1].id)
                        .fadeOut(400, function () {
                            if (questionIndex >= testContent.length) {
                                const results = testContent
                                    .map(function (t) {
                                        return checkTestQuestion(t)
                                    })
                                    .filter(function (a) {
                                        return a.isCorrect
                                    })

                                if (multiQuestionPoll != 1) {
                                    widgetContainer
                                        .find('.finish-screen')
                                        .find('.number-correct')
                                        .text(
                                            `${results.length} / ${testContent.length} questions correct`
                                        )
                                }

                                widgetContainer.find('.finish-screen').fadeIn(400)
                                questionIndex = 1
                            } else {
                                widgetContainer
                                    .find(
                                        '.question-screen-' +
                                            testContent[questionIndex].id.toString()
                                    )
                                    .fadeIn(400, function () {
                                        questionIndex++
                                    })
                            }
                        })
                })

            widgetContainer
                .find('.question-screen')
                .on('click', 'input[name="test-answer"]', function (e) {
                    if ($(this).prop('checked') === true) {
                        widgetContainer
                            .find('.question-screen')
                            .find('.submit-button')
                            .prop('disabled', false)
                        widgetContainer
                            .find('.question-screen')
                            .find('.submit-button')
                            .removeClass('disabled-button')
                    }
                })

            widgetContainer.on('click', '.grid-test-answer-container', handleAnswerClick)

            function handleAnswerClick(e) {
                e.preventDefault()
                // get vote
                selectedQuestionId = $(this).closest('.question-screen').attr('data-question-id')
                const answerId = $(this).find('input[name="test-answer"]').val()

                selectedOption = answerId

                $('input[name="test-answer"]').each(function (index, el) {
                    const id = $(this).val()

                    if (id === answerId) {
                        $(this).prev('.grid-poll-answer-container-overlay').show()
                    } else {
                        $(this).prev('.grid-poll-answer-container-overlay').hide()
                    }
                })

                widgetContainer
                    .find('.question-screen')
                    .find('.submit-button')
                    .prop('disabled', false)
                widgetContainer
                    .find('.question-screen')
                    .find('.submit-button')
                    .removeClass('disabled-button')
            }

            function sendTestVote(questionId, answerId) {
                var data = {
                    action: 'sno_test_vote',
                    question_id: questionId,
                    answer_id: answerId,
                }
                return jQuery.post(sno_polls_ajax_object.ajax_url, data, null, 'json')
            }

            function checkTestStatus() {
                show_loader()
                const testCookie = readCookie(cookieName)
                const parsedCookie = JSON.parse(testCookie)
                
                if (testCookie) {
                    for (let answer of parsedCookie) {
                        userAnswers.push(answer)
                    }

                    if (parsedCookie.length && parsedCookie.length >= testContent.length) {
                        handleAlreadyVoted()
                    } else if (parsedCookie.length && parsedCookie.length < testContent.length) {
                        questionIndex = parsedCookie.length + 1
                        handlePartiallyVoted()
                    }
                }
                hide_loader()
            }

            function updateCookieState(userAnswer) {
                const testCookie = readCookie(cookieName)
                if (!testCookie) {
                    const cookieData = [userAnswer]
                    createCookie(cookieName, JSON.stringify(cookieData), 30)
                } else {
                    const cookieData = [...JSON.parse(testCookie), userAnswer]
                    eraseCookie(cookieName)
                    createCookie(cookieName, JSON.stringify(cookieData), 30)
                }
            }

            function handleAlreadyVoted() {
                const results = testContent
                    .map(function (t) {
                        return checkTestQuestion(t)
                    })
                    .filter(function (a) {
                        return a.isCorrect
                    })

                if (multiQuestionPoll != 1) {
                    widgetContainer
                        .find('.finish-screen')
                        .find('.number-correct')
                        .text(`${results.length} / ${testContent.length} questions correct`)
                }

                widgetContainer.find('.intro-screen').fadeOut(400, function () {
                    $('.finish-screen').fadeIn(400, function () {})
                })
            }

            function handlePartiallyVoted() {
                widgetContainer.find('.intro-screen').fadeOut(400, function () {
                    widgetContainer.find('.test-header-img-container').hide(400)
                    widgetContainer
                        .find('.question-screen-' + testContent[questionIndex - 1].id)
                        .show(400)
                })
            }

            function show_loader() {
                widgetContainer.find('.test-content').fadeOut(400, function () {})
                widgetContainer.find('.test-loader').fadeIn(400, function () {})
            }

            function hide_loader() {
                widgetContainer.find('.test-loader').fadeOut(400, function () {})
                widgetContainer.find('.test-content').fadeIn(400, function () {})
            }

            function displayError() {
                widgetContainer.find('.test-loader').fadeOut(400, function () {})
                widgetContainer.find('.poll-answers-container').fadeOut(400, function () {})
                widgetContainer.find('.error-container').fadeIn(400, function () {})
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
