// 1.timer starts and counts down when start is clicked
function timerScore() {
  let timeLeft = 75;

  const countdown = setInterval(function () {
    timeLeft--;
    timer.innerHTML = timeLeft + " score";

    if (timeLeft === 0) {
      clearInterval(countdown);
    }
  }, 1000);
}
// 2.first question appears when start is clicked
// 3.capture the answer of the first question
// 4.rinse and repeat for the questions and capturing answers
// 6.final score appears when last quesiton is answered
// 7.allow user to end intials for score
// 8. highscore table is viewable

startButton.addEventListener("click", timerScore);
