const switcher = document.querySelector("#mode");

switcher.addEventListener("change", () => {
    document.body.setAttribute("data-theme", switcher.value)
})