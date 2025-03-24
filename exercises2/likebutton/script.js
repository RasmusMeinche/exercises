

/*

Opgave 1

const btn = document.querySelector("button");

btn.addEventListener("click", likeButton);

let clicks = 0;

function likeButton () {
    clicks++;
    console.log(clicks);

    if (clicks > 0) {
        btn.textContent = `🔥Likes ${clicks}`;
    }
} */



/*

Opgave 2

createElement ();
createElement ();
createElement ();
createElement ();


function createElement () {
    let clicks = 0;
    
    const newButton = document.createElement("button");

    newButton.textContent = `🔥Like`;

    document.body.appendChild(newButton);

    newButton.addEventListener("click", () => {
        clicks++;
        console.log(clicks);
        newButton.textContent = `🔥Likes ${clicks}`
    })
} */


const btn = document.querySelector("button");

btn.addEventListener("click", likeButton);

let clicks = 0;

function likeButton () {
    clicks++;
    console.log(clicks);

    if (clicks > 0) {
        btn.textContent = `🔥Likes ${clicks}`;
    }
}


