// Variables
const startButton = document.querySelector(".start-button");
const timer = document.querySelector(".time-remaining");
const timerContainer = document.querySelector(".timer");
const title = document.querySelector(".title");
const highScore = document.querySelector(".highscores");
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
let questionCounter = 0;

// Objects storing questions
const question1 = {
  question: "Commonly used data types DO NOT include?",
  answer: "2. alert",
  answerPool: ["1. string", "2. alert", "3. boolean", "4. numbers"],
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
  answer: "4. console.log",
  answerPool: [
    "1. JavaScript",
    "2. terminal/bash",
    "3. for loops",
    "4. console.log",
  ],
};

// Array for objects
const questions = [question1, question2, question3, question4, question5];

// Timer function to keep track of time and score
function timerScore() {
  timer.innerHTML = timeLeft;
  intervalRef = setInterval(function () {
    timeLeft--;
    timer.innerHTML = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(intervalRef);
      gameResults();
    }
  }, 1000);
}

// Question function, created the questions and loops through the array to present the questions to the user.
function question(index) {
  questionsContainer.innerHTML = questions[index].question;
  startButton.style.display = "none";
  questionsContainer.style.display = "block";
  highScore.disabled = true;
  title.style.display = "none";

  const answerPool = questions[index].answerPool;

  for (let i = 0; i < answerPool.length; i++) {
    const answerButtonContainer = document.createElement("div");
    const answerButton = document.createElement("button");
    answerButton.classList.add("button");
    answerButton.innerHTML = answerPool[i];
    questionsContainer.appendChild(answerButtonContainer);
    questionsContainer.classList.add("questionsContainer");
    answerButtonContainer.appendChild(answerButton);
    answerButton.addEventListener("click", function (event) {
      questionCounter = questionCounter + 1;
      if (questions[index].answer === event.target.innerText) {
        if (questionCounter >= questions.length) {
          gameResults();
        } else {
          question(questionCounter);
        }
      } else {
        timeLeft = timeLeft - 10;
        if (questionCounter >= questions.length) {
          gameResults();
        } else {
          question(questionCounter);
        }
      }
    });
  }
}

// Function displays the score in the top right as well as shows the input field for intials to track scores
function gameResults() {
  if (timeLeft > 0) {
    questionsContainer.style.display = "none";
    input.style.display = "block";
    highScore.disabled = false;
    submitButton.style.display = "block";
    submitButton.addEventListener("click", userInput);
  } else if (timeLeft <= 0) {
    questionsContainer.style.display = "none";
    input.style.display = "block";
    submitButton.style.display = "block";
    submitButton.addEventListener("click", userInput);
  }
  timer.innerHTML = timeLeft;
  clearInterval(intervalRef);
}

// Function takes user input and stores in local storage.
function userInput() {
  const scoreEntry = {
    intials: input.value,
    score: timeLeft,
  };
  if (input.value.length > 0) {
    if (leaderboard) {
      leaderboard.push(scoreEntry);
      localStorage.setItem("coding-quiz-score", JSON.stringify(leaderboard));
    } else {
      leaderboard = [];
      leaderboard.push(scoreEntry);
      localStorage.setItem("coding-quiz-score", JSON.stringify(leaderboard));
    }
    input.value = "";
    highScoreTable();
  } else {
    alert("Initals are required");
  }
}

// Function takes user input and displays it on the leaderboard.
function highScoreTable() {
  if (leaderboard) {
    for (let i = 0; i < leaderboard.length; i++) {
      const scoreEntryContainer = document.createElement("div");
      const scoreEntryValue = document.createElement("span");
      leaderboardEntries.appendChild(scoreEntryContainer);
      scoreEntryContainer.appendChild(scoreEntryValue);
      scoreEntryValue.classList.add("scoreValue");
      scoreEntryValue.innerHTML += leaderboard[i].intials;
      scoreEntryValue.innerHTML += ": " + leaderboard[i].score;
    }
  }
  leaderboardContents.style.display = "block";
  questionsContainer.style.display = "none";
  title.style.display = "none";
  startButton.style.display = "none";
  timerContainer.style.display = "none";
  highScore.style.display = "none";
  submitButton.style.display = "none";
  input.style.display = "none";
}

// Function clears user data from local storage
function resetScoreboard() {
  localStorage.clear("coding-quiz-score");
  leaderboardEntries.innerHTML = "";
  leaderboard = JSON.parse(localStorage.getItem("coding-quiz-score"));
}

// Returns to the "home page" and allows the quiz to be taken again
function gotoHome() {
  leaderboardContents.style.display = "none";
  title.style.display = "flex";
  startButton.style.display = "block";
  timerContainer.style.display = "block";
  highScore.style.display = "block";
  leaderboardEntries.innerHTML = "";
  questionCounter = 0;
  timeLeft = 75;
  timer.innerHTML = "";
}

// Event listeners to call functions
startButton.addEventListener("click", function () {
  timerScore();
  question(questionCounter);
});

highScore.addEventListener("click", highScoreTable);
resetButton.addEventListener("click", resetScoreboard);
gobackButton.addEventListener("click", gotoHome);
