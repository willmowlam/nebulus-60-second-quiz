// Page objects
const listHighScores = document.getElementById("highscores");
const buttonClearScores = document.getElementById("clear");

// Clear scores
buttonClearScores.addEventListener("click", function(event) {
  localStorage.removeItem("highScores");
  displayHighScores();
});

function displayHighScores(){
  
  // Set high scores or empty array if none exist yet
  let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

  for (let i = 0; i < highScores.length; i++) {
    const score = highScores[i];
    const li = document.createElement("li");
    li.textContent = highScores[i].initials + " - " + highScores[i].score;
    listHighScores.appendChild(li);
  }

};

displayHighScores();