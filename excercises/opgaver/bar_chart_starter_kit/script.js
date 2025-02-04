
function skalBrugesOmLidt() {
    
}

const barArray = [];


const list = document.querySelector("ul");

const li = document.createElement("li");
li.style.setProperty("--height", "30");
list.appendChild(li);

setInterval(generateBars, 100);


function generateBars() {
    const rndNum = Math.floor(Math.random() * 100);
    const li = document.createElement("li");
li.style.setProperty("--height", rndNum);
    barArray.push(rndNum);
    console.log("Det her er tallet:",barArray);
    if (barArray.length >= 30) {
        list.removeChild(list.children[0]);
    }
    list.appendChild(li);
}