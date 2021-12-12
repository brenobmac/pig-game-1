'use strict';

//Element selection:
let player0El = document.querySelector(".player--0");
let player0Score = document.getElementById("score--0");
let score0El = document.getElementById("score--0");
let current0El = document.getElementById("current--0");
let player1El = document.querySelector(".player--1");
let player1Score = document.getElementById("score--1");
let score1El = document.getElementById("score--1");
let current1El = document.getElementById("current--1")
let modalWindow = document.querySelector(".modal");
let btnInstructions = document.querySelector(".btn--instructions");
let btnCloseModal = document.querySelector(".close-modal");
let overlay = document.querySelector(".overlay");
let diceEl = document.querySelector(".dice");
let btnNewGame = document.querySelector(".btn--new");
let btnRoll = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");
let player1 = document.getElementById("name--0");
let player2 = document.getElementById("name--1");

//Starting parameters:
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");
overlay.classList.add("hidden");
modalWindow.classList.add("hidden");
player1.textContent = ">Player 1";
let scores = [0,0];  //Sabing accumulated player scores
let currentScore = 0; //Saving dice roll scores (pre-hold)
let activePlayer = 0; //Player 1 = 0, Player 2 = 1.
let playing = true; //Tracks if anybody won the game. Will stop button functionlaity when false

//Player switch function:
const playerSwitch = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //Resets current player's score before switching players
  activePlayer = activePlayer === 0 ? 1 : 0; //Changing active player
  currentScore = 0;
  player0El.classList.toggle("player--active"); //Gives the class active if not there, otherwise removes it.
  player1El.classList.toggle("player--active");

  //If block to give player name a ">" to indicate current player
  if (activePlayer == 0){
    player1.textContent = ">Player 1";
    player2.textContent = "Player 2";
  }
  else {
    player1.textContent = "Player 1";
    player2.textContent = ">Player 2";
  }
}

//Function for opening & closing instructions:
const openInstructions = function() {
  modalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

const closeInstructions = function () {
  modalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
}

//Event listeners for the instructions:
btnInstructions.addEventListener("click", openInstructions); //Open instructions
btnCloseModal.addEventListener("click", closeInstructions); //Close instructions
overlay.addEventListener("click", closeInstructions);
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modalWindow.classList.contains("hidden")) {//Checks if Esc was pressed and if there is "hidden" (if there is window is open)
    closeInstructions();
  }
})

//New game functionality:
btnNewGame.addEventListener("click", function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");
  overlay.classList.add("hidden");
  modalWindow.classList.add("hidden");
  player1.textContent = ">Player 1";
  scores = [0,0];
  currentScore = 0;
  activePlayer = 0; 
  playing = true;
  
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  
  player1.textcontent = ">Player 1";
  player2.textContent = "Player 2"

})

//Dice functionality
btnRoll.addEventListener("click", function() {
    if (playing){
    //Dice roll
    let diceNumber = Math.trunc(Math.random() * 6 + 1); //Number between 1 and 6

    //Dice display
    diceEl.src = `dice-${diceNumber}.png`; //Changes source to show the appropriate dice number png
    diceEl.classList.remove("hidden"); //Shows dice

    //Dice roll score logic:
    //Check for 1
    if (diceNumber !== 1){
      //Add dice roll to current player's score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore; //Changing current player's score
    }
    //Switch to next player if roll = 1
    else {
    playerSwitch();
    }

  }
})


//Hold functionality:
btnHold.addEventListener("click", function(){
  if (playing) {
    //Adding current score to accumulated score
    scores[activePlayer] += currentScore; //Adds current score to array;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    currentScore = 0;

    //Check if accumulated score >= 100:
    if (scores[activePlayer] >= 100){ //Player wins
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner"); //Gives winner class to player (check css file)
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      document.getElementById(`name--${activePlayer}`).textContent = `Player ${activePlayer + 1} wins!`;
      diceEl.classList.add("hidden");
    }
    else{//Game continues
    //Switch player:
    playerSwitch();
    }
  }

})



