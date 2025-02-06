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
const locale = "da";

const student1 = {
  firstName: "Jonas",
  lastName: "Vingegård",
}

const nameToDealWith = "firstName";

console.log(student1.firstName);
console.log(student1["firstName"]);

/* Den her skal briges */
console.log(student1[nameToDealWith]);