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

function SavedData(overskrift, beskrivelse, nummer, isFavorite = false) {
    const clone = document.querySelector("#opgave-template").content.cloneNode(true);

    // Tilføj data
    clone.querySelector("[data-field=over]").textContent = overskrift;
    clone.querySelector("[data-field=besk]").textContent = beskrivelse;
    clone.querySelector("[data-field=antal]").textContent = nummer;

    // Tilføj listener på check (✓)
    const checkBtn = clone.querySelector("[data-field=done]");
    checkBtn.addEventListener("click", function () {
        moveToDone(overskrift, beskrivelse, nummer, checkBtn.parentElement);
    });

    // ⭐ Tilføj stjerne-knap
    const starBtn = clone.querySelector("[data-field=stjerne]");
    starBtn.textContent = isFavorite ? "★" : "☆";

    starBtn.addEventListener("click", function () {
        isFavorite = !isFavorite;
        starBtn.textContent = isFavorite ? "★" : "☆";
        updateFavoriteStatus(overskrift, beskrivelse, nummer, isFavorite);
    });

    // 🗑 Tilføj event listener til skraldespanden
    const deleteBtn = clone.querySelector("[data-field=skrald]");
    deleteBtn.addEventListener("click", function () {
        removeItem(overskrift, beskrivelse, nummer, deleteBtn.parentElement);
    });

    document.querySelector("#template-output").appendChild(clone);

    closeForm();
}

// 🔥 Funktion til at opdatere favoritstatus i localStorage
function updateFavoriteStatus(overskrift, beskrivelse, nummer, isFavorite) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Find den opgave, der skal opdateres
    tasks = tasks.map(task => {
        if (task.overskrift === overskrift && task.beskrivelse === beskrivelse && task.nummer === String(nummer)) {
            return { ...task, isFavorite: isFavorite }; // Opdater favoritstatus
        }
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🎯 Opdater `openUp()` til at gemme favoritstatus
function openUp() {
    const inputOverskrift = document.getElementById("input-overskrift");
    const inputText = document.getElementById("input-text");
    const inputNumber = document.getElementById("input-number");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = {
        overskrift: inputOverskrift.value,
        beskrivelse: inputText.value,
        nummer: inputNumber.value,
        isFavorite: false // Ny opgave starter som ikke-favorit
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    SavedData(newTask.overskrift, newTask.beskrivelse, newTask.nummer, newTask.isFavorite);

    inputOverskrift.value = "";
    inputText.value = "";
    inputNumber.value = "0";
}

// 🔥 Opdater `loadSavedTasks()` til at vise favoritstatus
function loadSavedTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        SavedData(task.overskrift, task.beskrivelse, task.nummer, task.isFavorite);
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

function moveToDone(overskrift, beskrivelse, nummer, element) {
    // Fjern fra localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => 
        !(task.overskrift === overskrift && task.beskrivelse === beskrivelse && task.nummer === String(nummer))
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Opret ny færdig opgave i UI
    const doneContainer = document.querySelector("#done-opgaver");
    const doneTask = document.createElement("div");
    doneTask.classList.add("done-task");
    doneTask.innerHTML = `
        <h3>${overskrift}</h3>
        <p>${beskrivelse}</p>
        <p>Antal: ${nummer}</p>
        <button class="delete-done">🗑</button>
    `;

    // Tilføj event listener til slet-knap
    doneTask.querySelector(".delete-done").addEventListener("click", function () {
        doneTask.remove();
    });

    doneContainer.appendChild(doneTask);

    // Fjern opgave fra "to-do" listen
    element.remove();
}

function closeForm () {
    document.querySelector(".opgaver").classList.add("none");

}