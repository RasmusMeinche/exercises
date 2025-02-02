maxNum = 100;
minNum = 0;

let answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
console.log("Tallet:", answer);

document.addEventListener("DOMContentLoaded", function () {
    indenSpil();
});

function indenSpil() {
    document.querySelector("#startSpillet").addEventListener("click", startSpillet);
    document.querySelector("#forHoejt").addEventListener("click", forHoejt);
    document.querySelector("#forLavt").addEventListener("click", forLavt);
    document.querySelector("#perfekt").addEventListener("click", spilletSlutter);
};

function forHoejt () {

    document.querySelector("#text").innerHTML = "Spil";
};
function forLavt () {

};

function spilletSlutter () {

};