// Variables
const startButton = document.querySelector(".start-button");
const timer = document.querySelector(".time-remaining");
const title = document.querySelector(".title");

// 1.timer starts and counts down when start is clicked
function timerScore() {
  let timeLeft = 75;

  const countdown = setInterval(function () {
    timeLeft--;
    timer.innerHTML = timeLeft;

    if (timeLeft === 0) {
      clearInterval(countdown);
    }
  }, 1000);
}
// 2.first question appears when start is clicked
function question() {
  title.innerHTML = questions[0].question;
  startButton.style.display = "none";

  const answerPool = questions[0].answerPool;

  for (let i = 0; i < answerPool.length; i++) {
    const answerButton = document.createElement("button");
    answerButton.innerHTML = answerPool[i];
    title.appendChild(answerButton);
    answerButton.addEventListener("click", function (event) {
      if (questions[0].answer === event.target.innerText) {
        console.log("answer was correct");
        // score, go next questions, if not last Q
      } else {
        console.log("answer was wrong");
      }
    });
  }
}
// 3.capture the answer of the first question
// 4.rinse and repeat for the questions and capturing answers
// 5.10 seconds or score gets removed from total and a wrong answer is clicked.
// 6.final score appears when last quesiton is answered
// 7.allow user to end intials for score
// 8. highscore table is viewable

startButton.addEventListener("click", timerScore);
