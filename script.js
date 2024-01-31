const computerScore = document.querySelector(".pcCnt");
const userScore = document.querySelector(".playerCnt");
const userSide = document.querySelector(".user-side");
const compSide = document.querySelector(".comp-side");
// Get all the elements needed
const totalScreen = document.querySelector('.container');
const gamePlayArena = document.querySelector('.icons');
const resultPage = document.querySelector('.result-section');
const userFist = document.querySelector('#user-fist');
const userScissor = document.querySelector('#user-scissor');
const userPaper = document.querySelector('#user-paper');
const winnerText = document.querySelector('#wintxt');
const loserText = document.querySelector('#losetxt');
const subLevelText = document.querySelector('.lowertxt');
const tieText = document.querySelector('#tietxt');
const playAgain = document.querySelector('.playagn');
const replayAgain = document.querySelector('.replayagn');
const pcFist = document.querySelector('#pc-fist');
const pcScissor = document.querySelector('#pc-scissor');
const pcPaper = document.querySelector('#pc-paper');
const winnerCelebration = document.querySelector('.winner-celebration');
const winnerPlayAgain = document.querySelector('.winnerplyagn');
const rulesSection = document.querySelector('.rules-info');
const collapse = document.querySelector('.close');
const rulesButton = document.querySelector('#rulesbtn');
const nxtButton  = document.querySelector('#nxtbtn');

// Local Storage to get SCORE
function updateScoreAndDisplay(){
    let score = {
        user: 0,
        computer: 0,
    };
    if (localStorage.getItem("score")) {
        score = JSON.parse(localStorage.getItem("score"));
    } 
    userScore.innerHTML = score.user;
    computerScore.innerHTML = score.computer;
};
updateScoreAndDisplay();

// Event listeners for gameplay options
document.getElementById('rock').addEventListener('click', () => playGame('rock'));
document.getElementById('paper').addEventListener('click', () => playGame('paper'));
document.getElementById('scissor').addEventListener('click', () => playGame('scissor'));

// Function to generate computer's choice
const getComputerChoice = () => {
    const choices = ['rock', 'paper', 'scissor'];
    // generates numbers between 0,1 and 2.
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
};

function determineWinner(userChoice, computerChoice){
    if (userChoice === computerChoice) {
      return "tie";
    } else if (
      (userChoice === 'rock' && computerChoice === 'scissor') ||
      (userChoice === 'paper' && computerChoice === 'rock') ||
      (userChoice === 'scissor' && computerChoice === 'paper')
    ) {
      return "User wins";
    } else {
      return "Computer wins";
    }
};
// Based on the result and we will update the scores 
function updateScores(result){
    let score = {
        user: 0,
        computer: 0,
    };
    if (localStorage.getItem("score")) {
        score = JSON.parse(localStorage.getItem("score"));
    }
    if (result === "User wins") {
        score.user += 1;
    } else if (result === "Computer wins") {
        score.computer += 1;
    }
    
    // Save the updated scores back to local storage
    localStorage.setItem("score", JSON.stringify(score));
    updateScoreAndDisplay();
};


// Function to play the game
function playGame(userChoice) {
    // console.log("userChoice:", userChoice);

    const computerChoice = getComputerChoice();
    // console.log("computerChoice:", computerChoice);

    // determine the results and genarate result
    const result = determineWinner(userChoice,computerChoice);
    // console.log("Result: ", result);

    updateScores(result);

    // displaying the result page based on the result
    ResultPage(result, userChoice, computerChoice);
};

const resultIcon = (userChoice, computerChoice) => {
    switch(userChoice) {
    case "rock":
        userFist.style.display = "flex";
        userPaper.style.display = "none";
        userScissor.style.display = "none";
        break;
    case "paper":
        userFist.style.display = "none";
        userPaper.style.display = "flex";
        userScissor.style.display = "none";
        break;
    case "scissor":
        userFist.style.display = "none";
        userPaper.style.display = "none";
        userScissor.style.display = "flex";
        break;
    default:
        break;
    }
  
    switch(computerChoice) {
    case "rock":
        pcFist.style.display = "flex";
        pcPaper.style.display = "none";
        pcScissor.style.display = "none";
        break;
    case "paper":
        pcFist.style.display = "none";
        pcPaper.style.display = "flex";
        pcScissor.style.display = "none";
        break;
    case "scissor":
        pcFist.style.display = "none";
        pcPaper.style.display = "none";
        pcScissor.style.display = "flex";
        break;
    default:
        break;
    }
};

const ResultPage = (result, userChoice, computerChoice) => {
    
    gamePlayArena.style.display = "none";
    resultPage.style.display = "flex";
  
    if (result === "tie") {
        userSide.classList.remove("gradient-over-icon");
        compSide.classList.remove("gradient-over-icon");
        tieText.style.display = "block";
        replayAgain.style.display = "block";

        winnerText.style.display = "none";
        subLevelText.style.display = "none";
        loserText.style.display="none";
        playAgain.style.display = "none";
        nxtButton.style.display="none";
  
        resultIcon(userChoice, computerChoice);
    }else if (result === "User wins") { 
        userSide.classList.add("gradient-over-icon");
        winnerText.style.display = "block";
        subLevelText.style.display = "block";
        playAgain.style.display = "block";
        nxtButton.style.display = "inline";
        compSide.classList.remove("gradient-over-icon");
        replayAgain.style.display="none";
        loserText.style.display="none";
        tieText.style.display="none";
        resultIcon(userChoice, computerChoice);
        
    }else if (result === "Computer wins") {
        compSide.classList.add("gradient-over-icon");
        loserText.style.display = "block";
        subLevelText.style.display = "block";
        playAgain.style.display = "block";
        userSide.classList.remove("gradient-over-icon");
        replayAgain.style.display="none";
        nxtButton.style.display = "none";
        winnerText.style.display = "none";
        tieText.style.display="none";
        resultIcon(userChoice, computerChoice);
    }
};
// if the user clicks playagain, the gameplayarea should appear
playAgain.addEventListener('click',()=>{
    gamePlayArena.style.display="flex";
    resultPage.style.display="none";
    winnerCelebration.style.display="none";
});

replayAgain.addEventListener('click',()=>{
    gamePlayArena.style.display="flex";
    resultPage.style.display="none";
    winnerCelebration.style.display="none";
});
// if the user clicks nextButton, the celebrationpage should appear
nxtButton.addEventListener('click',()=>{
    winnerCelebration.style.display="flex";
    totalScreen.style.display="none";
    nxtButton.style.display="none";
});

winnerPlayAgain.addEventListener('click',()=>{
    totalScreen.style.display="flex";
    winnerCelebration.style.display="none";
    resultPage.style.display="none";
    gamePlayArena.style.display="flex";
});
// if the button is clicked, we should pop up the rules section
rulesButton.addEventListener('click',()=>{
    rulesSection.style.display="flex";
    collapse.style.display="flex";
});
// if the button is clicked, we need to close the rules section.
collapse.addEventListener('click',()=>{
    rulesSection.style.display="none";
    collapse.style.display="none";
});