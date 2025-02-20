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

    // Load tasks from localStorage
    loadTasks();
}

function formOpensUp() {
    document.querySelector(".form").classList.remove("none");
}

function closeForm() {
    document.querySelector(".form").classList.add("none");
}

function loadTasks() {
    // Load tasks from localStorage
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

    // Add event listener for the done button
    const doneButton = taskRow.querySelector("[data-field=done]");
    if (doneButton) {
        doneButton.addEventListener("click", tasksDone);
    } else {
        console.error('Element with data-field="done" not found.');
    }

    // Add event listener for the star button
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

    // Save task to localStorage
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

    // Debugging: Log the taskId to ensure it's being retrieved correctly
    console.log("Marking task as done with ID:", taskId);

    // Remove the task from #template-output
    taskElement.remove();

    // Append the task to the done tasks container
    const doneContainer = document.querySelector("#done-opgaver");
    const doneTemplate = document.querySelector("#task-done").content.cloneNode(true);
    const doneTaskRow = doneTemplate.querySelector("tr");

    doneTaskRow.dataset.id = taskId;
    doneTaskRow.querySelector("[data-field=over]").textContent = taskElement.querySelector("[data-field=over]").textContent;
    doneTaskRow.querySelector("[data-field=besk]").textContent = taskElement.querySelector("[data-field=besk]").textContent;
    doneTaskRow.querySelector("[data-field=antal]").textContent = taskElement.querySelector("[data-field=antal]").textContent;

    // Add event listener for the trash icon in the done task
    const doneTrashButton = doneTaskRow.querySelector("[data-field=skrald]");
    if (doneTrashButton) {
        doneTrashButton.addEventListener("click", removeDoneTask);
    } else {
        console.error("Done trash button is null!");
    }

    // Add event listener for the star button in the done task
    const doneStarButton = doneTaskRow.querySelector("[data-field=stjerne]");
    if (doneStarButton) {
        doneStarButton.addEventListener("click", toggleStar);
    } else {
        console.error("Done star button is null!");
    }

    doneContainer.appendChild(doneTaskRow);

    // Update localStorage
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

    // Debugging: Log the taskId to ensure it's being retrieved correctly
    console.log("Removing done task with ID:", taskId);

    // Henter done task fra localStorage
    let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

    // Remove the done task with the matching id
    doneTasks = doneTasks.filter(task => task.id != taskId);

    // Save the updated array back to localStorage
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));

    // Remove the task element from the DOM
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