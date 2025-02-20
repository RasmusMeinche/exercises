window.addEventListener("DOMContentLoaded", start);

function start() {
    const addButton = document.querySelector("#add-knap");
    const submitButton = document.querySelector(".submit");

    addButton.addEventListener("click", formOpensUp);

    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        SaveTaskData();
        closeForm();
    });

    // Holder former lukket indtil den bliver klikket
    document.querySelector(".form").classList.add("none");

    // Load tasks fra localStorage
    loadTasks();
}

function formOpensUp() {
    document.querySelector(".form").classList.remove("none");
}

function closeForm() {
    document.querySelector(".form").classList.add("none");
}

function loadTasks() {
    // Load tasks fra localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

    tasks.forEach(task => {
        const clone = document.querySelector("#opgave-template").content.cloneNode(true);
        const taskRow = clone.querySelector("tr");
        taskRow.dataset.id = task.id;

        taskRow.querySelector("[data-field=over]").textContent = task.overskrift;
        taskRow.querySelector("[data-field=besk]").textContent = task.beskrivelse;
        taskRow.querySelector("[data-field=antal]").textContent = task.antal;

        const trashButton = taskRow.querySelector("[data-field=skrald]");
        if (trashButton) {
            trashButton.addEventListener("click", removeTask);
        }

        const doneButton = taskRow.querySelector("[data-field=done]");
        if (doneButton) {
            doneButton.addEventListener("click", tasksDone);
        }

        const starButton = taskRow.querySelector("[data-field=stjerne]");
        if (starButton) {
            starButton.addEventListener("click", toggleStar);
        }

        document.querySelector("#template-output").appendChild(taskRow);
    });

    doneTasks.forEach(task => {
        const clone = document.querySelector("#task-done").content.cloneNode(true);
        const taskRow = clone.querySelector("tr");
        taskRow.dataset.id = task.id;

        taskRow.querySelector("[data-field=over]").textContent = task.overskrift;
        taskRow.querySelector("[data-field=besk]").textContent = task.beskrivelse;
        taskRow.querySelector("[data-field=antal]").textContent = task.antal;

        const trashButton = taskRow.querySelector("[data-field=skrald]");
        if (trashButton) {
            trashButton.addEventListener("click", removeDoneTask);
        }

        const starButton = taskRow.querySelector("[data-field=stjerne]");
        if (starButton) {
            starButton.addEventListener("click", toggleStar);
        }

        document.querySelector("#done-opgaver").appendChild(taskRow);
    });
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

    // tilføjer eventlistner
    const doneButton = taskRow.querySelector("[data-field=done]");
    if (doneButton) {
        doneButton.addEventListener("click", tasksDone);
    } else {
        console.error('Element with data-field="done" not found.');
    }

    // tilføjer eventlistner
    const starButton = taskRow.querySelector("[data-field=stjerne]");
    if (starButton) {
        starButton.addEventListener("click", toggleStar);
    } else {
        console.error('Element with data-field="stjerne" not found.');
    }

    // Tilføj kun <tr> til <tbody>
    document.querySelector("#template-output").appendChild(taskRow);

    // Nulstil input felterne
    document.getElementById("input-overskrift").value = "";
    document.getElementById("input-text").value = "";
    document.getElementById("input-number").value = "";

    // gemmer til localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({
        id: taskRow.dataset.id,
        overskrift: taskInput,
        beskrivelse: descInput,
        antal: howManyInput
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(event) {
    const taskElement = event.target.closest("tr");
    const taskId = taskElement.dataset.id;

    console.log("Removing task with ID:", taskId);

    // Henter task fra localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // fjerner opgaven med matchende id
    tasks = tasks.filter(task => task.id != taskId);

    // Gemmer det opdaterede array
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Fjerner elementet fra HTML'en
    taskElement.remove();
}

function tasksDone(event) {
    const taskElement = event.target.closest("tr");
    const taskId = taskElement.dataset.id;

    console.log("Marking task as done with ID:", taskId);

    // fjerner task fra #template-output
    taskElement.remove();

    // tilføjer dem til det rigtige sted
    const doneContainer = document.querySelector("#done-opgaver");
    const doneTemplate = document.querySelector("#task-done").content.cloneNode(true);
    const doneTaskRow = doneTemplate.querySelector("tr");

    doneTaskRow.dataset.id = taskId;
    doneTaskRow.querySelector("[data-field=over]").textContent = taskElement.querySelector("[data-field=over]").textContent;
    doneTaskRow.querySelector("[data-field=besk]").textContent = taskElement.querySelector("[data-field=besk]").textContent;
    doneTaskRow.querySelector("[data-field=antal]").textContent = taskElement.querySelector("[data-field=antal]").textContent;

    // eventlistener + debug
    const doneTrashButton = doneTaskRow.querySelector("[data-field=skrald]");
    if (doneTrashButton) {
        doneTrashButton.addEventListener("click", removeDoneTask);
    } else {
        console.error("Done trash button is null!");
    }

    //  event listener + debug
    const doneStarButton = doneTaskRow.querySelector("[data-field=stjerne]");
    if (doneStarButton) {
        doneStarButton.addEventListener("click", toggleStar);
    } else {
        console.error("Done star button is null!");
    }

    doneContainer.appendChild(doneTaskRow);

    // opdaterer localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

    const task = tasks.find(task => task.id == taskId);
    if (task) {
        doneTasks.push(task);
        tasks = tasks.filter(task => task.id != taskId);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
}

function removeDoneTask(event) {
    const taskElement = event.target.closest("tr");
    const taskId = taskElement.dataset.id;

    console.log("Removing done task with ID:", taskId);

    // Henter doneTasks fra localStorage
    let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

    // Fjerner den med matchende id
    doneTasks = doneTasks.filter(task => task.id != taskId);

    // Gemmer den konverterede data
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));

    // Fjerner elementet
    taskElement.remove();
}

function toggleStar(event) {
    const starElement = event.target;
    if (starElement.textContent === "☆") {
        starElement.textContent = "★";
    } else {
        starElement.textContent = "☆";
    }
}