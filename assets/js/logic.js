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
const quizTime = 60;

// Time removed for an incorrect answer
const incorrectPenalty = 10;

// Objects for page elements
const timer = document.getElementById("time");
const startScreen = document.getElementById("start-screen");
const buttonStart = document.getElementById("start");
const questions = document.getElementById("questions");
const questionTitle = document.getElementById("questionTitle");
const questionChoices = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScore = document.getElementById("final-score");
const initials = document.getElementById("initials");
const buttonSubmitInitials = document.getElementById("submit");
const feedback = document.getElementById("feedback");

