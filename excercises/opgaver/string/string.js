/* let string = "KUN SMÅ BOGSTAVER";

string = string.toLowerCase();

console.log(string); */


/* const navn = "  Anne     -  Katrine  ";


console.log(navn.replaceAll(" ", "")); */


/* const firstName = "Peter";
const middleName = "Heronimous";
const lastNameName = "Lind";

const fullName = firstName + " " + middleName + " " + lastNameName;

splitName(fullName);

function splitName(fullName) {
  let name = fullName.split(" ");
  console.log(name);
} */

const theName = "Peter Heronimous Lind";

const firstName = theName.substring(0, theName.indexOf(" "));
const middleName = theName.substring(theName.indexOf(" ") + 1, theName.lastIndexOf(" "));
const lastName = theName.substring(theName.lastIndexOf(" ") + 1);





/* const fullName = "Peter Heronimous Lind";


const name = fullName.split(" ");

const firstName = name[0];
const middleName = name[1];
const lastNameName = name[2];

console.log(name); */

/* const fullName = "Peter";

const nameUpper = fullName.substring(0, 2).toLowerCase() + fullName.charAt(2).toUpperCase() + fullName.substring(3).toLowerCase();

console.log(nameUpper); */


const fullName = "Peter";

const nameUpper = fullName.charAt(0).toUpperCase() + fullName.slice(1).toLowerCase();

console.log(nameUpper);