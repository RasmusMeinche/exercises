let minNum = 1;
let maxNum = 100;
let answer = Math.floor((minNum + maxNum) / 2);
console.log("Det her er answer:", answer)
let guess = 0;

document.addEventListener("DOMContentLoaded", function () {
    beforeGame();
    document.querySelector("#text").textContent = "Tænk på et tal mellem 0 og 100";
});

function beforeGame () {
document.querySelector("#startSpillet").addEventListener("click", startGame)
}

function startGame() {
    document.querySelector("#text").textContent = `Jeg gætter på ${answer}?`;
    document.querySelector("#forHoejt").addEventListener("click", forHoejt);
    document.querySelector("#forLavt").addEventListener("click", forLavt);
    document.querySelector("#perfekt").addEventListener("click", spilletSlutter);
}

function forHoejt() {
    guess++;
    maxNum = answer - 1;
    answer = Math.floor((minNum + maxNum) / 2);
    document.querySelector("#text").textContent = `Nemt, det sku da ${answer}?`;
}

function forLavt() {
    guess++;
    minNum = answer + 1;
    answer = Math.floor((minNum + maxNum) / 2);
    document.querySelector("#text").textContent = `Nemt, det sku da ${answer}?`;
}

function spilletSlutter() {
    document.querySelector("#text").textContent = `Det det nemmeste i verden, jeg gættede det på ${guess + 1}`;
}