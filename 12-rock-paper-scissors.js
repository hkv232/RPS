let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loss: 0,
  ties: 0,
};


updateScoreElement();

let isAutoPlay = false;
let intervalID;


function autoPlay(){
  if (!isAutoPlay){
    intervalID =  setInterval(function(){
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1250)
    isAutoPlay = true;
    document.querySelector('.auto-play-button').innerHTML = 'Stop Auto Play'

  } else {
    clearInterval(intervalID);
    isAutoPlay = false;
    document.querySelector('.auto-play-button').innerHTML = 'Auto Play'
  } 
}

function playGame(playerMove) {

const computerMove = pickComputerMove();

let result = '';
let reason = '';

if (playerMove === 'rock'){
  
  if (computerMove === 'rock') {
  result = 'You Tied';
  } else if (computerMove === 'paper') {
    result = 'You Lost';
  } else if (computerMove === 'scissors') {
    result = 'You Won';

  }

} else if (playerMove === 'paper') {
  
  if (computerMove === 'paper') {
  result = 'You Tied';
  } else if (computerMove === 'scissors') {
    result = 'You Lost';
  } else if (computerMove === 'rock') {
    result = 'You Won';
  }
  
} else if (playerMove === 'scissors') {
  
  if (computerMove === 'scissors') {
  result = 'You Tied';
  } else if (computerMove === 'rock') {
    result = 'You Lost';
  } else if (computerMove === 'paper') {
    result = 'You Won';
  }

}

if (result === 'You Won'){
  score.wins += 1;
  reason = 'beat the';
} else if (result === 'You Lost'){
  score.loss += 1;
  reason = 'lost to';
} else if (result === 'You Tied'){
  score.ties += 1;
  reason = 'tied with';
}

localStorage.setItem('wins', JSON.stringify(score.wins));
localStorage.setItem('loss', JSON.stringify(score.loss));
localStorage.setItem('ties', JSON.stringify(score.ties));
localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result').innerHTML = `Your ${playerMove} ${reason} computer's ${computerMove}. <br><br><br> ${result}`;
document.querySelector('.your-moves').innerHTML = `Your Move: <img src="media/${playerMove}-choice2.png" class="choice-icon" alt="">`;
document.querySelector('.cpu-moves').innerHTML = `CPU Move: <img src="media/${computerMove}-choice2.png" class="choice-icon" alt="">`;





}

function pickComputerMove() {

const randomNum = Math.random();

let computerMove = '';

if(randomNum >= 0 && randomNum < 1/3){
  computerMove = 'rock';
} else if(randomNum >= 1/3 && randomNum < 2/3){
  computerMove = 'paper';
} else if(randomNum >= 2/3 && randomNum < 1){
  computerMove = 'scissors';
}

return computerMove;

}

function updateScoreElement(){
document.querySelector('.wins-result').innerHTML = `${score.wins}`;
document.querySelector('.loss-result').innerHTML = `${score.loss}`;
document.querySelector('.ties-result').innerHTML = `${score.ties}`;

resetMoves();

}

function resetMoves(){
  document.querySelector('.your-moves').innerHTML = `Your Move: <img src="media/blank.png" class="choice-icon" alt="">`;
  document.querySelector('.cpu-moves').innerHTML = `CPU Move: <img src="media/blank.png" class="choice-icon" alt="">`;

}