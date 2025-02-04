document.querySelector("button").addEventListener("click", showProducts);

function showProducts() {
    const bc = [{ name: "Hvidevarer", link: "/hvidevarer" },{ name: "Vaskemaskiner", link: "/hvidevarer/vaskemaskiner" },{ name: "Bosch", link: "/hvidevarer/vaskemaskiner/bosch/" },];

    bc.forEach(element => {
        if (bc[bc.length-1].name === element.name) {
            console.log("Jeg er ved det sidste element", element.name);
            document.querySelector("ul").innerHTML += `<li>${element.name}</li>`
        }
        else  {
            document.querySelector("ul").innerHTML += `<li><a href="${element.link}">${element.name} /</a></li>`
            }

    });

    document.querySelector("button").addEventListener("click", removeProducts);
}

function removeProducts() {
/*     document.querySelector("ul").innerHTML = "";
    document.querySelector("button").addEventListener("click", showProducts); */
    document.querySelector("ul").classList.add("none")

    showProducts ();
}

/* const arr = ["Ræv","Hund","Bjørn","abe"];

console.log(arr[arr.length-1]); */