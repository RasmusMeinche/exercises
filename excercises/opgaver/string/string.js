/* let string = "KUN SMÅ BOGSTAVER";

string = string.toLowerCase();

console.log(string); */


/* const navn = "  Anne     -  Katrine  ";


console.log(navn.replaceAll(" ", "")); */

const firstName = "Peter";
const middleName = "Heronimous";
const lastNameName = "Lind";

const fullName = firstName + " " + middleName + " " + lastNameName;

console.log(fullName[0]);

splitName(fullName);

function splitName(fullName) {
  let name = fullName.split(" ");
  console.log(name);
}