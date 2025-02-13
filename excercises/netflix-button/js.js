window.addEventListener("DOMContentLoaded", start);

document.querySelector(".fill-button").classList.remove("fill-button");

let buttonClicked = false;

function start() {
    const button = document.querySelector("button");
    button.classList.add("fill-button");

    button.addEventListener("animationend", animationEnded);
    button.addEventListener("click", buttonHasBeenClicked);
    button.addEventListener("mouseover", putOnAnimation);
}

function animationEnded() {    
    if (buttonClicked === false) {
        document.body.style.backgroundColor = "darkblue";
    } else {
        buttonHasBeenClicked();
    }
    
    document.querySelector("button").classList.remove("fill-button");
    document.querySelector("button").classList.add("standard");
    
}

function buttonHasBeenClicked() {
    buttonClicked = true;
    document.body.style.backgroundColor = "white";
    document.querySelector("button").classList.remove("fill-button");
    document.querySelector("button").classList.add("standard");
    document.querySelector("button").style.color = "black";
    document.querySelector("button").classList.add("hide");
}

function putOnAnimation() {
    if (buttonClicked === true) {
    } else {
        start();
    }
}