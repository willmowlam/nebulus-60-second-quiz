// Page objects
const listHighScores = document.getElementById("highscores");
const buttonClearScores = document.getElementById("clear");

// Clear scores
buttonClearScores.addEventListener("click", function(event) {
  localStorage.removeItem("highScores");
});
