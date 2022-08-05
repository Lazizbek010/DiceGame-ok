// Selectors
let btnHold = document.querySelector('.btn--hold')
let btnRoll = document.querySelector('.btn--roll')
let btnNew = document.querySelector('.btn--new')
let dice = document.querySelector('.dice')
let score0 = document.querySelector('#score--0')
let score1 = document.querySelector('#score--1')
let current0 = document.querySelector('#current--0')
let current1 = document.querySelector('#current--1')
let bgModal = document.querySelector('.bg-modal')
let winner = document.querySelector('.winner')
let closeModal = document.querySelector('.close-modal')
dice.style.display = 'none'

// Variables
let currentScore = 0
let activePlayer = 0
let score = [0, 0]
let gameover = true
// Events
btnRoll.addEventListener('click', rollDice)
btnHold.addEventListener('click', holdDice)
btnNew.addEventListener('click', refresh)
// Functions

function rollDice() {
    if (gameover) {
        let random = Math.floor(Math.random() * 6 + 1)
        dice.src = `dice-${random}.png`
        dice.style.display = 'block'

        if (random !== 1) {
            currentScore += random
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore
        } else {
            changePlayer()
        }
    }
}

function holdDice() {
    if (gameover) {
        score[activePlayer] += currentScore
        document.querySelector(`#score--${activePlayer}`).textContent = score[activePlayer]
        if (score[activePlayer] >= 100) {
            gameover = false
            modal()
            winner.textContent = activePlayer + 1
            document.querySelector('.player--0').classList.remove('player--active')
            document.querySelector('.player--1').classList.remove('player--active')
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        } else {
            changePlayer()
        }
    }
}

function changePlayer() {
    document.querySelector(`#current--${activePlayer}`).textContent = '0'
    currentScore = 0
    activePlayer = activePlayer == 0 ? 1 : 0
    document.querySelector('.player--0').classList.toggle('player--active')
    document.querySelector('.player--1').classList.toggle('player--active')
}

function refresh() {
    currentScore = 0
    activePlayer = 0
    score = [0, 0]
    gameover = true
    dice.style.display = 'none'
    document.querySelector('.player--0').classList.add('player--active')
    document.querySelector('.player--1').classList.remove('player--active')
    document.querySelector('.player--0').classList.remove('player--winner')
    document.querySelector('.player--1').classList.remove('player--winner')
    score0.textContent = '0'
    score1.textContent = '0'
    current0.textContent = '0'
    current1.textContent = '0'

}


function modal(){
    bgModal.style.display = 'block'
}
closeModal.addEventListener('click', ()=>{
    bgModal.style.display = 'none'
})