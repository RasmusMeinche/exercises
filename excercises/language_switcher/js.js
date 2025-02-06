"use strict";
const texts = {
  de: {
    texts: [
      { text: "Das Bot", location: ".header" },
      { text: "Das Ro-Bot", location: ".footer" },
    ],
  },
  da: {
    texts: [
      { text: "Båden", location: ".header" },
      { text: "Robotten", location: ".footer" },
    ],
  },
};
/* const locale = "da"; */
const dansk = "da";
const tysk = "de";

document.addEventListener("DOMContentLoaded", visDansk)

function switchLanguage(lang) {
  let text = texts[lang];
  switch (lang) {
    case "de":
      text.texts.forEach((element) => {
        document.querySelector(element.location).textContent = element.text;
      });
      break;
      case "da":
        text.texts.forEach((element) => {
          document.querySelector(element.location).textContent = element.text;
        });
        break;
      }
    }
    
document.querySelector(".dansk").addEventListener("click", visDansk);
document.querySelector(".german").addEventListener("click", visTysk);

function visDansk () {
  switchLanguage(dansk);
}
function visTysk () {
  switchLanguage(tysk);
}

/* function filterHandler(filter) {
  console.log("filterHandler", filter);
  let filterdArr;
  switch (filter) {
    case "all":
      filterdArr = veh;
      break; */



      /* const student1 = {
        firstName: "Jonas",
        lastName: "Vingegård",
      }
      
      const nameToDealWith = "firstName";
      
      console.log(student1.firstName);
      console.log(student1["firstName"]); */
      
      /* Den her skal briges */
      /* console.log(student1[nameToDealWith]); */