let maxNum = 50;
let minNum = 1;

let answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
console.log("Det her er det tilfældige tal:", answer);

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#tal").textContent = "Det tilfældige tal er: " + answer;
});