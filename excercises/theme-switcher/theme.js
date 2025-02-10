const themeSelector = document.getElementById("mode");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.setAttribute("data-theme", savedTheme);
    themeSelector.value = savedTheme;
}

themeSelector.addEventListener("change", function () {
    const selectedTheme = this.value;
    body.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
});

