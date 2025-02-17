    window.addEventListener("DOMContentLoaded", start);

function start() {
    document.querySelector("#add-knap").addEventListener("click", formComesUp);
}

function formComesUp() {
    document.querySelector(".opgaver").classList.remove("none");
}

function openUp() {
    const inputOverskrift = document.getElementById("input-overskrift");
    const inputText = document.getElementById("input-text");

    localStorage.setItem("valueOfOverskrift", inputOverskrift.value);
    localStorage.setItem("valueOfText", inputText.value);

    SavedData();
}

function SavedData() {
    const clone = document.querySelector("#opgave-template").content.cloneNode(true);

    clone.querySelector("[data-field=over]").textContent = localStorage.getItem("valueOfOverskrift");
    clone.querySelector("[data-field=besk]").textContent = localStorage.getItem("valueOfText");

    document.querySelector("#template-input").appendChild(clone);
}