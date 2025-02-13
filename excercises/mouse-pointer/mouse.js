document.addEventListener("mousemove", mouseChange);

function mouseChange () {
const lightness = (event.clientX / window.innerWidth) * 100;
const stauration = (event.clientY / window.innerHeight) * 100;
document.body.style.backgroundColor = `hsl(500, ${stauration}%, ${lightness}%)`;
};