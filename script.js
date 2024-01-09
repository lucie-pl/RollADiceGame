'use strict';

//Player one
let scorePOne = document.getElementById('score--0');
let playerOne = document.querySelector('.player--0');
let currentScoreOne = document.getElementById('current--0');

//Player two
let scorePTwo = document.getElementById('score--1');
let playerTwo = document.querySelector('.player--1');
let currentScoreTwo = document.getElementById('current--1');

//Dice and buttons
const dice = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
let scores, currentScore, activePlayer, playingState, otherPlayer;

//Initializinf function
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playingState = true;

  currentScoreOne.textContent = 0;
  currentScoreTwo.textContent = 0;
  scorePOne.textContent = 0;
  scorePTwo.textContent = 0;

  dice.classList.add('hidden');
  playerOne.classList.remove('player--winner', 'player--loser');
  playerOne.classList.add('player--active');
  playerTwo.classList.remove(
    'player--winner',
    'player--active',
    'player--loser'
  );

  document.body.style.background =
    'linear-gradient(to top left, #e3e93a 0%, #d8821a 100%)';
  document.querySelector('.congrats--0').classList.add('hidden');
  document.querySelector('.congrats--1').classList.add('hidden');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};

//Rolling dice functionality
btnRollDice.addEventListener('click', function () {
  if (playingState) {
    const diceResult = Math.trunc(Math.random() * 6 + 1);
    dice.src = `dice-${diceResult}.png`;
    dice.classList.remove('hidden');
    if (diceResult !== 1) {
      currentScore += diceResult;
      // currentElScorePOne.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//Hold button
btnHold.addEventListener('click', function () {
  if (playingState) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 15) {
      playingState = false;
      dice.classList.add('hidden');
      document.body.style.background =
        'linear-gradient(to top left, #03640c 0%, #2cee5a 100%)';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      otherPlayer = 1 - activePlayer;
      document
        .querySelector(`.player--${otherPlayer}`)
        .classList.add('player--loser');
      document
        .querySelector(`.congrats--${activePlayer}`)
        .classList.remove('hidden');
    } else {
      switchPlayer();
    }
  }
});

//Reset game
btnNewGame.addEventListener('click', init);
