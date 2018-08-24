/*
Rules of the game:
- The game has 2 players, playing in rounds
- Each turn, the player rolls the dice as many times as they want
- The result from each round will be added to the ROUND score
- But if a 1 is rolled, the ROUND score goes to zero
- The player can choose to 'HOLD', where their round stops and is added to the OWNScore
- First player to reach 60 wins!
*/

const scores = [0, 0]
const roundScore = 0
const activePlayer = 1

const dice = Math.floor(Math.random() * 5) + 1 // random number between 1 & 6

// use querySelector to change content of selectors
document.querySelector('#current-' + activePlayer).textContent = dice

// store  current player's score as a variable
const x = document.querySelector('#score-' + activePlayer).innerHTML

// hide dice class at beginning of game
document.querySelector('.dice').style.display = 'none'
