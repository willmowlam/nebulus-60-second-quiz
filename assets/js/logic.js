// Set of questions --> array of objects
// Each question needs the following:
  // Question text
  // Set of answers
  // Which answer is correct

// Landing page:
  // Explanation of the quiz
  // Start button

// Click the start button:
  // Landing page goes away
  // Timer starts
  // The first question appears (with its answers)

// For each question:
  // User clicks an answer
  // Their choice is compared to the correct answer as stored in the question's object
  // If correct, tell them
  // If incorrect, tell them AND subtract time from the timer
  // Optional: play a sound for correct or incorrect
  // Either way, the question disappears after a few seconds and the next question appears

// After the last question:
  // Timer stops
  // Question disappears
  // Form appears for user to enter their initials
  // Display their score

// User submits form
  // Initials and score get stored in local storage
  // User is taken to the high scores page
  // High scores are listed, sorted highest to lowest
  // User has option to take the quiz again

// Amount of time to answer all questions
const quizTime = 100;

// Time removed for an incorrect answer
const incorrectPenalty = 10;

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

  // Start timer
  timer = setInterval(function () {   

    // So long as there is time left in the quiz
    if (timeLeft > 0 && question < questions.length) {
      timerText.textContent = timeLeft;
      //displayQuestion(question);
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

  displayQuestion(question);

};

// Display a specific question
function displayQuestion(q) {  

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

};

// Listen to choice buttons
questionChoices.addEventListener("click", function(event) {
  const element = event.target;

  // If that element is a button...
  if (element.matches("button") === true) {
    answerQuestion(element.getAttribute("data-answer"));
  }

});

// Handle answers
function answerQuestion(answer){

  /* Decrement by one as the question index is always incremented by 
     one at the end of displayQuestion() */
  const q = question - 1;

  console.log(questions[q].title);
  console.log(answer);

  if (answer === questions[q].answer){
    // Correct
    console.log("Correct");
  }else{
    // Incorrect
    console.log("Incorrect");
  }

  // Display next question
  displayQuestion(question);

};

// End of the quiz
function stopQuiz(){
  addClass(questionScreen, "hide");
  addClass(feedbackScreen, "hide");
  removeClass(endScreen, "hide");
};