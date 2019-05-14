'use strict';

let questionTicker = 0;
let score = 0;

function generateQuestionsTemplate() {
  if (questionTicker < questionsAsked.length) {
    return `<div class="question-${questionTicker}">
        <h2>${questionsAsked[questionTicker].question}</h2>

        <form class="questions-form">
        <fieldset>
            <label class="answerChoices">
                <input type="radio" value="${
                  questionsAsked[questionTicker].choices[0]
                }" name="choice" required></input>
                <span>${questionsAsked[questionTicker].choices[0]}</span>
            </label>

            <label class="answerChoices">
                <input type="radio" value="${
                  questionsAsked[questionTicker].choices[1]
                }" name="choice" required></input>
                <span>${questionsAsked[questionTicker].choices[1]}</span>
            </label>

            <label class="answerChoices">
                <input type="radio" value="${
                  questionsAsked[questionTicker].choices[2]
                }" name="choice" required></input>
                <span>${questionsAsked[questionTicker].choices[2]}</span>
            </label>

            <label class="answerChoices">
                <input type="radio" value="${
                  questionsAsked[questionTicker].choices[3]
                }" name="choice" required></input>
                <span>${questionsAsked[questionTicker].choices[3]}</span>
            </label>
        </br>
        <button type="submit" class="submitButton">Submit</button>

        </fieldset>
        </form>
        </div>`;
  } else {
    handleEndOfQuiz();
    handleRestartQuiz();
    $('.questionTicker').text(10);
  }
}

function handleWalkMeButton() {
  $('.walkMeButton').click(() => {
    $('.introduction').remove();
    $('.questionsAndAnswers').css('display', 'block');
    $('.questionTicker').text(1);
    renderQuizApp();
  });
}

function renderQuizApp() {
  if (questionTicker < questionsAsked.length) {
    $('.questionsAndAnswers').html(generateQuestionsTemplate());
  } else {
    handleRemoveQuestionNumber();
    endOfQuizTemplate();
    handleRestartQuiz();
  }
}

function handleAnswerSelected() {
  $('.questionsAndAnswers').on('submit', '.questions-form', function() {
    event.preventDefault();
    let selected = $('input:checked');
    let choice = selected.val();
    let correctAnswer = questionsAsked[questionTicker].correctAnswer;
    if (choice === correctAnswer) {
      selected.parent().addClass('correct');
      userAnswerCorrect();
    } else {
      selected.parent().addClass('incorrect');
      userAnswerIncorrect();
    }
  });
}

function userAnswerCorrect() {
  score++;
  $('.score').text(score);

  let correctAnswer = questionsAsked[questionTicker].correctAnswer;
  $('.questionsAndAnswers').html(
    `<div class="correctFeedback"><p>You're Awesome!</p><button type=button class="nextButton">Onward!</button</button></div>`
  );
}

function userAnswerIncorrect() {
  let correctAnswer = questionsAsked[questionTicker].correctAnswer;
  $('.questionsAndAnswers').html(
    `<div class="correctFeedback"><p><b>Sorry, maybe you'll get the next question correct.</b><br>The correct answer is <span>"${correctAnswer}"</span></br></p><button type=button class="nextButton">Onward!</button></div>`
  );
}

function endOfQuizTemplate() {
  $('.questionsAndAnswers').html(
    `<div class="endOfQuiz"><p><b>Great Job! You made it to the end.</b></br><span>You scored ${score} out of 10! </br>You missed ${questionsAsked.length -
      score} questions.</span></p><button type=button class="restartButton">Restart Quiz</button></div>`
  );
}

function handleRemoveQuestionNumber() {
  if ('questionTicker > questionsAsked.length') $('.changeNumber').hide();
}

function handleNextQuestion() {
  $('.questionsAndAnswers').on('click', '.nextButton', function(event) {
    questionTicker++;
    $('.questionTicker').text(questionTicker + 1);
    renderQuizApp();
  });
}

function handleRestartQuiz() {
  $('.questionsAndAnswers').on('click', '.restartButton', function(event) {
    location.reload();
  });
}

function startQuiz() {
  handleWalkMeButton();
  handleNextQuestion();
  handleAnswerSelected();
}

$(startQuiz);
