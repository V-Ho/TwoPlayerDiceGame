/*
Rules of the game:
- The game has 2 players, playing in rounds
- Each turn, the player rolls the dice as many times as they want
- The result from each round will be added to the ROUND score
- But if a 1 is rolled, the ROUND score goes to zero
- The player can choose to 'HOLD', where their round stops and is added to the OWNScore
- First player to reach 60 wins!
*/

let scores, roundScore, activePlayer, gamePlaying

startGame()

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
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
      switchPlayer()
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add player's current score to total score
    scores[activePlayer] += roundScore

    // Update Total Score
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

    // Check if player won game
    if (scores[activePlayer] >= 20) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER'
      document.querySelector('.dice').style.display = 'none'
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
      gamePlaying = false // set state variable to false
    } else {
      switchPlayer()
    }
  }
})

// reset scores & player to 0
document.querySelector('.btn-new').addEventListener('click', startGame)

// switch active player
function switchPlayer () {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
  roundScore = 0
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'
  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')
  document.querySelector('.dice').style.display = 'none'
}

// initialize game
function startGame () {
  scores = [0, 0]
  roundScore = 0
  activePlayer = 0
  gamePlaying = true

  // hide dice class at beginning of game
  document.querySelector('.dice').style.display = 'none'

  document.getElementById('score-0').textContent = '0'
  document.getElementById('current-0').textContent = '0'
  document.getElementById('score-1').textContent = '0'
  document.getElementById('current-1').textContent = '0'
  document.querySelector('#name-0').textContent = 'Player 1'
  document.querySelector('#name-1').textContent = 'Player 2'
  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')
  document.querySelector('.player-0-panel').classList.remove('active')
  document.querySelector('.player-1-panel').classList.remove('active')
  document.querySelector('.player-0-panel').classList.add('active')
}
