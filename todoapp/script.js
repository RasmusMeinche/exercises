window.addEventListener("DOMContentLoaded", start);

function start() {
    document.querySelector("#add-knap").addEventListener("click", formComesUp);
    document.querySelector(".submit").addEventListener("click", openUp);

    // Hent og vis gemte opgaver ved sidenload
    loadSavedTasks();
}

function formComesUp() {
    document.querySelector(".opgaver").classList.remove("none");
}

function openUp() {
    const inputOverskrift = document.getElementById("input-overskrift");
    const inputText = document.getElementById("input-text");

    // Hent eksisterende opgaver fra localStorage eller brug en tom array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Tilføj den nye opgave til arrayet
    const newTask = {
        overskrift: inputOverskrift.value,
        beskrivelse: inputText.value
    };

    tasks.push(newTask); // Tilføj den nye opgave

    // Gem opdateret array tilbage i localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Tilføj den nye opgave til UI
    SavedData(newTask.overskrift, newTask.beskrivelse);

    // Ryd inputfelterne
    inputOverskrift.value = "";
    inputText.value = "";
}

function SavedData(overskrift, beskrivelse) {
    const clone = document.querySelector("#opgave-template").content.cloneNode(true);

    clone.querySelector("[data-field=over]").textContent = overskrift;
    clone.querySelector("[data-field=besk]").textContent = beskrivelse;

    document.querySelector("#template-output").appendChild(clone);

    closeForm();
}

// Funktion til at hente og vise gemte opgaver ved sidenload
function loadSavedTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        SavedData(task.overskrift, task.beskrivelse);
    });
}

/* function removeItem () {
    document.querySelector("td")
} */

function closeForm () {
    document.querySelector(".opgaver").classList.add("none");
}