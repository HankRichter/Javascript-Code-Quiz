// Variables
const startButton = document.querySelector(".start-button");
const timer = document.querySelector(".time-remaining");
const timerContainer = document.querySelector(".timer");
const title = document.querySelector(".title");
const highScore = document.querySelector(".highscores");
const p = document.createElement("p");
const leaderboardContents = document.querySelector(".leaderboardContents");
const input = document.querySelector(".intialsInput");
const submitButton = document.querySelector(".submitButton");
const resetButton = document.querySelector(".resetButton");
const gobackButton = document.querySelector(".gobackButton");
const questionsContainer = document.querySelector(".questionsContainer");
const leaderboardEntries = document.querySelector(".leaderboardEntries");
let leaderboard = JSON.parse(localStorage.getItem("coding-quiz-score"));
let timeLeft = 75;
let intervalRef = null;
p.classList.add("ScoreP");

console.log(leaderboard);

const question1 = {
  question: "Commonly used data types DO NOT include?",
  answer: "alert",
  answerPool: ["string", "alert", "boolean", "numbers"],
};
const question2 = {
  question: "The condition in an if/else statement is enclosed in_____",
  answer: "3. parentheses",
  answerPool: [
    "1. quotes",
    "2. curly brackets",
    "3. parentheses",
    "4. square brackets",
  ],
};
const question3 = {
  question: "Arrays in JavaScript can be used to store______.",
  answer: "4. all of the above",
  answerPool: [
    "1. numbers and strings",
    "2. other arrays",
    "3. booleans",
    "4. all of the above",
  ],
};
const question4 = {
  question:
    "String values must be enclosed within _____ when being assigned to variables.",
  answer: "3. quotes",
  answerPool: ["1. commas", "2. curly brackets", "3. quotes", "4. parantheses"],
};
const question5 = {
  question:
    "A very useful tool used during development and debugging for printing content to the debugger is:",
  answer: "4. console.log()",
  answerPool: [
    "1. JavaScript",
    "2. terminal/bash",
    "3. for loops",
    "4 console.log",
  ],
};
// const question6 = {
//   question: "Commonly used data types DO NOT include?",
//   answer: "alert",
//   answerPool: ["string", "alert", "boolean", "numbers"],
// };
// const question7 = {
//   question: "Commonly used data types DO NOT include?",
//   answer: "alert",
//   answerPool: ["string", "alert", "boolean", "numbers"],
// };
// const question8 = {
//   question: "Commonly used data types DO NOT include?",
//   answer: "alert",
//   answerPool: ["string", "alert", "boolean", "numbers"],
// };
// const question9 = {
//   question: "Commonly used data types DO NOT include?",
//   answer: "alert",
//   answerPool: ["string", "alert", "boolean", "numbers"],
// };
// const question10 = {
//   question: "Commonly used data types DO NOT include?",
//   answer: "alert",
//   answerPool: ["string", "alert", "boolean", "numbers"],
// };

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

function gameResults() {
  if (timeLeft > 0) {
    title.innerHTML = "All done!";
    title.appendChild(p);
    input.style.display = "block";
    submitButton.style.display = "block";
    submitButton.addEventListener("click", userInput);
    p.innerHTML = "Your score: " + timeLeft;
  } else if (timeLeft <= 0) {
    title.innerHTML = "GAME OVER";
  }
  timer.innerHTML = timeLeft;
  clearInterval(intervalRef);
}

function highScoreTable() {
  if (leaderboard) {
    for (let i = 0; i < leaderboard.length; i++) {
      const scoreEntryContainer = document.createElement("div");
      const scoreEntryValue = document.createElement("span");
      leaderboardEntries.appendChild(scoreEntryContainer);
      scoreEntryContainer.appendChild(scoreEntryValue);
      scoreEntryValue.innerHTML += leaderboard[i].intials;
      scoreEntryValue.innerHTML += leaderboard[i].score;
    }
  }
  questionsContainer.style.display = "none";
  leaderboardContents.style.display = "block";
  title.style.display = "none";
  startButton.style.display = "none";
  timerContainer.style.display = "none";
  highScore.style.display = "none";
  submitButton.style.display = "none";
  input.style.display = "none";
}

function resetScoreboard() {
  localStorage.clear("coding-quiz-score");
  leaderboardEntries.innerHTML = "";
}

// Button within scoreboard to go back to.
function gotoHome() {
  leaderboardContents.style.display = "none";
  questionsContainer.style.display = "none";
  title.style.display = "flex";
  startButton.style.display = "block";
  timerContainer.style.display = "block";
  highScore.style.display = "block";
  leaderboardEntries.innerHTML = "";
}
function userInput(event) {
  console.log(input.value);
  const scoreEntry = {
    intials: input.value,
    score: timeLeft,
  };
  if (leaderboard) {
    leaderboard.push(scoreEntry);
    localStorage.setItem("coding-quiz-score", JSON.stringify(leaderboard));
  } else {
    leaderboard = [];
    leaderboard.push(scoreEntry);
    localStorage.setItem("coding-quiz-score", JSON.stringify(leaderboard));
  }
  highScoreTable();
}

startButton.addEventListener("click", function () {
  timerScore();
  question(questionCounter);
});

highScore.addEventListener("click", highScoreTable);
resetButton.addEventListener("click", resetScoreboard);
gobackButton.addEventListener("click", gotoHome);
