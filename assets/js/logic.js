// Amount of time to answer all questions
const quizTime = 60;

// Time removed for an incorrect answer
const incorrectPenalty = 10;

// Time added for correct answer
const correctBonus = 5;

// Timer object
let timer;

// Time left in quiz
let timeLeft;

// Objects for page elements
const timerText = document.getElementById("time");
const startScreen = document.getElementById("start-screen");
const buttonStart = document.getElementById("start");
const questionScreen = document.getElementById("questions");
const questionTitle = document.getElementById("question-title");
const questionChoices = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const initials = document.getElementById("initials");
const buttonSubmitInitials = document.getElementById("submit");
const feedbackScreen = document.getElementById("feedback");

// Audio
const audioCorrect = new Audio();
const audioIncorrect = new Audio();
audioCorrect.src = './assets/sfx/correct.wav';
audioIncorrect.src = './assets/sfx/incorrect.wav';
audioCorrect.type = 'audio/wav';
audioIncorrect.type = 'audio/wav';

// Start button
buttonStart.addEventListener("click", function(event) {

  addClass(startScreen, "hide");
  removeClass(questionScreen, "hide");

  // start the quiz
  startQuiz();

});

// Add a class to an element
function addClass(element, className) {
  if (!element.classList.contains(className)) {
    element.classList.add(className);
  }
}
// Remove a class from an element
function removeClass(element, className) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  }
}

// Track current question
let question = 0;

// Beginning of the quiz
function startQuiz(){

  // Set time left
  timeLeft = quizTime;
  timerText.textContent = timeLeft;

  // Display first question
  displayQuestion(0);

  // Start timer
  timer = setInterval(function () {

    // So long as there is time left in the quiz
    if (timeLeft > 0 && question <= questions.length) {
      timerText.textContent = timeLeft;
    } else if (timeLeft === 0) {
      timerText.textContent = 0;
      finalScore.textContent = 0;
      clearInterval(timer);
      stopQuiz();
    } else {
      finalScore.textContent = timerText.textContent;
      clearInterval(timer);
      stopQuiz();
    }

    timeLeft--;

  }, 1000);

};

// Display a specific question
function displayQuestion(q) {  

  if (q < questions.length) {

    // Set question
    questionTitle.innerText = questions[q].title;

    // Clear any choice buttons
    questionChoices.innerHTML = "";
    
    // Display choice buttons
    for (let i = 0; i < questions[q].choices.length; i++) {
      const button = document.createElement("button");
      button.textContent = i + 1 + ". " + questions[q].choices[i];
      button.setAttribute("data-answer", questions[q].choices[i]);
      questionChoices.appendChild(button);
    }

    question++;

  } else {
    // No more questions available!
    finalScore.textContent = timerText.textContent;
    clearInterval(timer);
    stopQuiz();
  }

};

// Listen to choice buttons
questionChoices.addEventListener("click", function(event) {
  const element = event.target;

  // If that element is a button...
  if (element.matches("button") === true) {
    answerQuestion(element.getAttribute("data-answer"));
  }

});

// Submit initials to High Score
buttonSubmitInitials.addEventListener("click", function(event) {

  const initialsText = initials.value.trim();

  // Set high scores or empty array if none exist yet
  let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

  if (initialsText.length === 0){
    alert("Please enter your initials.");
  } else {
    // Save score to localstorage
    const score = { initials: initialsText, score: finalScore.textContent };
    highScores.push(score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location = "./highscores.html";
  }
  
});

// Handle answers
function answerQuestion(answer){

  /* Decrement by one as the question index is always incremented by 
     one at the end of displayQuestion() */
  const q = question - 1;

  if (answer === questions[q].answer) {
    // Correct
    feedbackScreen.innerText = "Correct!";

    // Play audio file
    audioCorrect.play();

    // Add time
    timeLeft = timeLeft + correctBonus;
    timerText.textContent = timeLeft;
  } else {
    // Incorrect
    feedbackScreen.innerText = "Incorrect!";

    // Play audio file
    audioIncorrect.play();

    // Remove time
    timeLeft = timeLeft - incorrectPenalty;
    timerText.textContent = timeLeft;
  }

  removeClass(feedbackScreen, "hide");

  let feedbackTimer = setInterval(function () {
    addClass(feedbackScreen, "hide");
  }, 5000);

  // Display next question
  displayQuestion(question);

};

// End of the quiz
function stopQuiz(){
  addClass(questionScreen, "hide");
  let feedbackTimer = setInterval(function () {
    addClass(feedbackScreen, "hide");
  }, 5000);
  removeClass(endScreen, "hide");
};