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
let roundScore = 0
let activePlayer = 1

// // store current player's score as a variable
// const x = document.querySelector('#score-' + activePlayer).innerHTML

// hide dice class at beginning of game
document.querySelector('.dice').style.display = 'none'

document.getElementById('score-1').textContent = '0'
document.getElementById('current-1').textContent = '0'
document.getElementById('score-2').textContent = '0'
document.getElementById('current-2').textContent = '0'

document.querySelector('.btn-roll').addEventListener('click', function () {
  // Random number between 1 & 6
  let dice = Math.floor(Math.random() * 6) + 1

  // Display corresponding dice image for number rolled
  let diceDom = document.querySelector('.dice')
  diceDom.style.display = 'block'
  diceDom.src = 'dice-' + dice + '.png'

  // Update round score of active player, unless 1 is rolled - then switch active player
  if (dice !== 1) {
    roundScore += dice
    document.querySelector('#current-' + activePlayer).textContent = roundScore
  } else {
    activePlayer === 1 ? activePlayer = 2 : activePlayer = 1
    roundScore = 0
    document.getElementById('current-1').textContent = '0'
    document.getElementById('current-2').textContent = '0'

    document.querySelector('.player-1-panel').classList.toggle('active')
    document.querySelector('.player-2-panel').classList.toggle('active')

    document.querySelector('.dice').style.display = 'none'

  }
})
