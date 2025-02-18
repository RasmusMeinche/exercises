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
    const inputNumber = document.getElementById("input-number");

    // Hent eksisterende opgaver fra localStorage eller brug en tom array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Tilføj den nye opgave til arrayet
    const newTask = {
        overskrift: inputOverskrift.value,
        beskrivelse: inputText.value,
        nummer: inputNumber.value
    };

    tasks.push(newTask); // Tilføj den nye opgave

    // Gem opdateret array tilbage i localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Tilføj den nye opgave til UI
    SavedData(newTask.overskrift, newTask.beskrivelse, newTask.nummer);

    // Ryd inputfelterne
    inputOverskrift.value = "";
    inputText.value = "";
    inputNumber.value = "0";
}

function SavedData(overskrift, beskrivelse, nummer) {
    const clone = document.querySelector("#opgave-template").content.cloneNode(true);

    // Tilføj data
    clone.querySelector("[data-field=over]").textContent = overskrift;
    clone.querySelector("[data-field=besk]").textContent = beskrivelse;
    clone.querySelector("[data-field=antal]").textContent = nummer;

    // Tilføj en event listener til skraldespanden
    const deleteBtn = clone.querySelector("td:last-child"); // Skraldespand-ikonet
    deleteBtn.addEventListener("click", function () {
        removeItem(overskrift, beskrivelse, nummer, deleteBtn.parentElement);
    });

    document.querySelector("#template-output").appendChild(clone);

 
closeForm();
}

function openBeskrivelse () {

}

// Funktion til at hente og vise gemte opgaver ved sidenload
function loadSavedTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        SavedData(task.overskrift, task.beskrivelse, task.nummer);
    });
}

function removeItem(overskrift, beskrivelse, nummer, element) {
    // Hent listen af opgaver fra localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Filtrer listen for at fjerne den specifikke opgave
    tasks = tasks.filter(task => 
        !(task.overskrift === overskrift && task.beskrivelse === beskrivelse && task.nummer === String(nummer))
    );

    // Gem den opdaterede liste tilbage i localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Fjern opgaven fra UI
    element.remove();
}

function closeForm () {
    document.querySelector(".opgaver").classList.add("none");

}