document.addEventListener("DOMContentLoaded", function () {
    startGame();
});

const minNum = 0;
const maxNum = 2;
let answer;

let rock = 0;
let paper = 1;
let scissor = 2;

function startGame() {
    document.querySelector(".rock").addEventListener("click", myDesicionRock);
    document.querySelector(".paper").addEventListener("click", myDesicionPaper);
    document.querySelector(".scissors").addEventListener("click", myDesicionScissor);
}

function gameRunning(callback) {
    document.querySelectorAll("#player1, #player2").forEach(element => {
        element.classList.add("shake");

        element.addEventListener("animationend", function () {
            element.classList.remove("shake");
            if (callback) callback();
        }, { once: true });
    });
}

function decisionBot() {
    document.querySelector("#player2").classList.remove("rock", "paper", "scissors", "shake");

    answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    console.log("Bot valgte:", answer);

    if (answer === rock) {
        document.querySelector("#player2").classList.remove("hidden");
        document.querySelector("#player2").classList.add("rock");
    } else if (answer === paper) {
        document.querySelector("#player2").classList.remove("hidden");
        document.querySelector("#player2").classList.add("paper");
    } else if (answer === scissor) {
        document.querySelector("#player2").classList.remove("hidden");
        document.querySelector("#player2").classList.add("scissors");
    }
}

function myDesicionRock() {
    resetResult();
    document.querySelector("#player1").classList.remove("hidden", "paper", "scissors");
    document.querySelector("#player1").classList.add("rock");

    gameRunning(() => {
        decisionBot();
        setTimeout(() => {
            whoWins(rock, answer);
        }, 500);
    });
}

function myDesicionPaper() {
    resetResult();
    document.querySelector("#player1").classList.remove("hidden", "rock", "scissors");
    document.querySelector("#player1").classList.add("paper");

    gameRunning(() => {
        decisionBot();
        setTimeout(() => {
            whoWins(paper, answer);
        }, 500);
    });
}

function myDesicionScissor() {
    resetResult();
    document.querySelector("#player1").classList.remove("hidden", "rock", "paper");
    document.querySelector("#player1").classList.add("scissors");

    gameRunning(() => {
        decisionBot();
        setTimeout(() => {
            whoWins(scissor, answer);
        }, 500);
    });
}

function whoWins(playerChoice, botChoice) {
    if (playerChoice === botChoice) {
        document.querySelector("#draw").classList.remove("hidden");
        document.querySelector("#win").classList.add("hidden");
        document.querySelector("#lose").classList.add("hidden");
    } else if (
        (playerChoice === rock && botChoice === scissor) ||
        (playerChoice === scissor && botChoice === paper) ||
        (playerChoice === paper && botChoice === rock)
    ) {
        document.querySelector("#win").classList.remove("hidden");
        document.querySelector("#draw").classList.add("hidden");
        document.querySelector("#lose").classList.add("hidden");
    } else {
        document.querySelector("#lose").classList.remove("hidden");
        document.querySelector("#draw").classList.add("hidden");
        document.querySelector("#win").classList.add("hidden");
    }
}

function resetResult() {
    document.querySelector("#draw").classList.add("hidden");
    document.querySelector("#win").classList.add("hidden");
    document.querySelector("#lose").classList.add("hidden");
}