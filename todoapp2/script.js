window.addEventListener("DOMContentLoaded", start);

function start() {
    const addButton = document.querySelector("#add-knap");
    const submitButton = document.querySelector(".submit");

    addButton.addEventListener("click", formOpensUp);

    // Add event listener for the submit button only once
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        SaveTaskData();
        closeForm();
    });

    // Holder former lukket indtil den bliver klikket
    document.querySelector(".form").classList.add("none");
}

function formOpensUp() {
    document.querySelector(".form").classList.remove("none");
}

function closeForm() {
    document.querySelector(".form").classList.add("none");
}

// Den her henter dataen om vores gemte tasks
function SaveTaskData() {
    const taskInput = document.getElementById("input-overskrift").value;
    const descInput = document.getElementById("input-text").value;
    const howManyInput = document.getElementById("input-number").value;

    const clone = document.querySelector("#opgave-template").content.cloneNode(true);

    const taskRow = clone.querySelector("tr"); // Hent kun <tr>, ikke hele tabellen!
    taskRow.dataset.id = Date.now();

    taskRow.querySelector("[data-field=over]").textContent = taskInput;
    taskRow.querySelector("[data-field=besk]").textContent = descInput;
    taskRow.querySelector("[data-field=antal]").textContent = howManyInput;

    // Debug: Se om skraldespanden eksisterer
    const trashButton = taskRow.querySelector("[data-field=skrald]");
    console.log("Trash button found:", trashButton);

    if (trashButton) {
        trashButton.addEventListener("click", removeTask);
    } else {
        console.error("Trash button is null!");
    }

    // Add event listener for the done button
    const doneButton = taskRow.querySelector("[data-field=done]");
    if (doneButton) {
        doneButton.addEventListener("click", tasksDone);
    } else {
        console.error('Element with data-field="done" not found.');
    }

    // Tilføj kun <tr> til <tbody>
    document.querySelector("#template-output").appendChild(taskRow);

    // Nulstil input felterne
    document.getElementById("input-overskrift").value = "";
    document.getElementById("input-text").value = "";
    document.getElementById("input-number").value = "";
}

function removeTask(event) {
    const taskElement = event.target.closest("tr");
    const taskId = taskElement.dataset.id;

    // Debugging: Log the taskId to ensure it's being retrieved correctly
    console.log("Removing task with ID:", taskId);

    // Henter task fra localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Remove the task with the matching id
    tasks = tasks.filter(task => task.id != taskId);

    // Save the updated array back to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Remove the task element from the DOM
    taskElement.remove();
}

function tasksDone(event) {
    const taskElement = event.target.closest("tr");
    const taskId = taskElement.dataset.id;

    console.log("Marking task as done with ID:", taskId);

    
}

/* function loadSavedTasks () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    console.log("Indlæser opgaver:", tasks);

    let activeTasks = tasks.filter(task => 
        !doneTasks.some(doneTask => 
            doneTask.overskrift === task.overskrift && doneTask.beskrivelse === task.beskrivelse && doneTask.nummer === task.nummer
        )
    );


} */

/* function loadSavedTasks() {
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
} */