const curseWords = [  {    bad: "var",    good: "const",  },  {    bad: "float",    good: "grid",  },  {    bad: "marquee",    good: "just don't",  },];

console.log(curseWords);

const dialog = document.querySelector("dialog");
document.querySelector("button").addEventListener("click", switchWords);
let timesClicked = 0;
dialog.close();


function switchWords() {
    timesClicked++;
    let textElement = document.querySelector("p");
    let text = textElement.textContent;

    curseWords.forEach((word) => {
        const replacement = `<span class="glow">${word.good}</span>`;
        text = text.replace(word.bad, replacement);
    });

    if (timesClicked >= 2) {
        dialog.showModal();
    }

    textElement.innerHTML = text;
}

