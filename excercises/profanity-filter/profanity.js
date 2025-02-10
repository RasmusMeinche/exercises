const curseWords = [  {    bad: "var",    good: "const",  },  {    bad: "float",    good: "grid",  },  {    bad: "marquee",    good: "just don't",  },];

console.log(curseWords);

document.querySelector("button").addEventListener("click", switchWords);


function switchWords() {
    let textElement = document.querySelector("p");
    let text = textElement.textContent;

    curseWords.forEach((word) => {
        text = text.replace(word.bad, word.good);
    });

    textElement.innerHTML = text;
}