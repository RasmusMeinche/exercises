window.addEventListener("DOMContentLoaded", start);

function start() {
    document.querySelector("#add-knap").addEventListener("click", formComesUp);
    document.querySelector(".submit").addEventListener("click", createTask);  // Brug createTask her
    
    // Hent og vis gemte opgaver
    loadSavedTasks();
    loadDoneTasks(); // 🚀 Henter færdige opgaver fra localStorage
}

function formComesUp() {
    document.querySelector(".opgaver").classList.remove("none");
}

function createTask() {
    const inputOverskrift = document.getElementById("input-overskrift");
    const inputText = document.getElementById("input-text");
    const inputNumber = document.getElementById("input-number");

    if (!inputOverskrift.value || !inputText.value) {
        alert("Overskrift og beskrivelse skal udfyldes!");
        return; // Stoppe funktionen, hvis data ikke er korrekt
    }

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

function SavedData(overskrift, beskrivelse, nummer, isFavorite = false) {
    const clone = document.querySelector("#opgave-template").content.cloneNode(true);

    // Hvis nummeret er 0, vis en tom string
    const antalText = nummer === "0" ? "" : nummer;

    // Tilføj data
    clone.querySelector("[data-field=over]").textContent = overskrift;
    clone.querySelector("[data-field=besk]").textContent = beskrivelse;
    clone.querySelector("[data-field=antal]").textContent = antalText;

    // Tilføj listener på check (✓)
    const checkBtn = clone.querySelector("[data-field=done]");
    checkBtn.addEventListener("click", function () {
        moveToDone(overskrift, beskrivelse, antalText, checkBtn.parentElement);
    });

    // ⭐ Tilføj stjerne-knap
    const starBtn = clone.querySelector("[data-field=stjerne]");
    starBtn.textContent = isFavorite ? "★" : "☆";

    starBtn.addEventListener("click", function () {
        isFavorite = !isFavorite;
        starBtn.textContent = isFavorite ? "★" : "☆";
        updateFavoriteStatus(overskrift, beskrivelse, antalText, isFavorite);
    });

    // 🗑 Tilføj event listener til skraldespanden
    const deleteBtn = clone.querySelector("[data-field=skrald]");
    deleteBtn.addEventListener("click", function () {
        removeItem(overskrift, beskrivelse, antalText, deleteBtn.parentElement);
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

function loadSavedTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

    console.log("Indlæser opgaver:", tasks);
    console.log("Indlæser færdige opgaver:", doneTasks);

    let activeTasks = tasks.filter(task => 
        !doneTasks.some(doneTask => 
            doneTask.overskrift === task.overskrift && doneTask.beskrivelse === task.beskrivelse && doneTask.nummer === task.nummer
        )
    );

    localStorage.setItem("tasks", JSON.stringify(activeTasks));

    activeTasks.forEach(task => {
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

function loadDoneTasks() {
    let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

    doneTasks.forEach(task => {
        addDoneTaskToUI(task.overskrift, task.beskrivelse, task.nummer);
    });
}

function addDoneTaskToUI(overskrift, beskrivelse, nummer) {
    // Opret en ny række til færdige opgaver
    const container = document.createElement("tr");

    container.innerHTML = `
        <td>${overskrift}</td>
        <td>${beskrivelse}</td>
        <td>${nummer}</td>
        <td data-field="skrald">🗑</td>
    `;

    // Tilføj event listener til skraldespanden
    const deleteBtn = container.querySelector("[data-field=skrald]");
    deleteBtn.addEventListener("click", function () {
        removeDoneTask(overskrift, beskrivelse, nummer, container);
    });

    // Tilføj til færdige opgaver sektionen
    document.querySelector("#opgaverne-er-her").appendChild(container);
}

function moveToDone(overskrift, beskrivelse, nummer, element) {
    console.log("Flytter til færdige opgaver:", overskrift, beskrivelse, nummer);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

    // 🚀 Filtrer "To-Do"-opgaver for at fjerne den valgte opgave
    tasks = tasks.filter(task => 
        !(task.overskrift === overskrift && task.beskrivelse === beskrivelse && task.nummer === String(nummer))
    );

    localStorage.setItem("tasks", JSON.stringify(tasks));

    const alreadyExists = doneTasks.some(task => 
        task.overskrift === overskrift && task.beskrivelse === beskrivelse && task.nummer === String(nummer)
    );

    if (!alreadyExists) {
        doneTasks.push({ overskrift, beskrivelse, nummer });
        localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
        addDoneTaskToUI(overskrift, beskrivelse, nummer);
    }

    element.remove();
}

function removeDoneTask(overskrift, beskrivelse, nummer, element) {
    let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

    // Filtrer listen for at fjerne den specifikke opgave
    doneTasks = doneTasks.filter(task => 
        !(task.overskrift === overskrift && task.beskrivelse === beskrivelse && task.nummer === String(nummer))
    );

    // Gem den opdaterede liste tilbage i localStorage
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));

    // Fjern opgaven fra UI
    element.remove();
}

function closeForm () {
    document.querySelector(".opgaver").classList.add("none");
}
