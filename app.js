/*
Rules of the game:
- The game has 2 players, playing in rounds
- Each turn, the player rolls the dice as many times as they want
- The result from each round will be added to the current score
- But if a 1 is rolled, the current score goes to zero
- The player can choose to 'HOLD', where their current streak stops and is added to the total score
- First player to reach 60 wins!
*/

let totalScores, currentScore, activePlayer, gamePlaying, numberOfClicks
numberOfClicks = 0

// switch active player
function stopPlayer () {
  currentScore = 0
  numberOfClicks = 0
  document.querySelector('.btn-roll').style.display = 'none'
  document.querySelector('.btn-next').style.display = 'inherit'
}

function switchPlayer () {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'
  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')
  document.querySelector('.dice').style.display = 'none'
  document.querySelector('.btn-roll').style.display = 'inherit'
  document.querySelector('.btn-next').style.display = 'none'
}

// initialize game
function startGame () {
  totalScores = [0, 0]
  currentScore = 0
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

startGame()

function controlNumberOfClicks () {
  numberOfClicks++
  let shouldContinue = true

  if (numberOfClicks >= 4) {
    numberOfClicks = 0
    shouldContinue = false
  }

  return shouldContinue
}

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    if (controlNumberOfClicks()) {
      // Random number between 1 & 6
      let dice = Math.floor(Math.random() * 6) + 1
      // Display corresponding dice image for number rolled
      let diceDom = document.querySelector('.dice')
      diceDom.style.display = 'block'
      diceDom.src = 'dice-' + dice + '.png'

      // Update round score of active player, unless 1 is rolled - then switch active player
      if (dice !== 1) {
        currentScore += dice
        document.getElementById('current-' + activePlayer).textContent = currentScore
      } else {
        stopPlayer()
      }
    } else {
      stopPlayer()
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add player's current score to total score
    totalScores[activePlayer] += currentScore

    // Update Total Score
    document.querySelector('#score-' + activePlayer).textContent = totalScores[activePlayer]

    // Check if player won game
    if (totalScores[activePlayer] >= 20) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER'
      document.querySelector('.dice').style.display = 'none'
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
      gamePlaying = false // set state variable to false
    } else {
      stopPlayer()
    }
  }
})

// reset totalScores & player to 0
document.querySelector('.btn-new').addEventListener('click', startGame)
document.querySelector('.btn-next').addEventListener('click', switchPlayer)
