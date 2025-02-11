/* Opgave 1 */

/* console.log("Hello World"); */


/* Opgave 2 */

/* var name = "Rasmus";
console.log(myName); */


/* Opgave 3 */
/* var a = 5;
var b = 10;

console.log(a + b); */


/* Opgave 4 */
/* function kvaNum(number) {
    return number * number;
}

kvaNum(9); */






/* Parametre opgaver */


//1
/* Skriv en funktion, der tager et navn som parameter og returnerer en hilsen. */

/* function greet (name) {
    return "Hello" + " " + name;
}

console.log(greet("Rasmus")); */


//2
/* Skriv en funktion, der tager to tal og returnerer summen. */

/* function add (a, b) {
    return a + b;
}

console.log(add(5, 10)); */



//3
/* Lav en funktion, der tjekker, om et tal er positivt eller negativt. */

/* function check (num) {
    return num >= 0 ? "positivt" : "negativt";
}

console.log(check(-9))
console.log(check(9)) */


//4
/* Skriv en funktion, der tager en sætning og returnerer antallet af tegn. */

/* function lengthOf (sentence) {
    return sentence.length;
}

console.log(lengthOf("Det her er hvad den tæller")); */


//5
/* Lav en funktion, der returnerer den højeste værdi af to tal. */

/* function max(a, b) {
    if (a > b) {
return a
    }
    else (a < b)
    return b
}

console.log(max(2, 9))
console.log(max(14, 4)) */

/* Kan også løses sådan her: */

/* function max(a, b) {
    return a > b ? a : b;
}

console.log(max(10, 20)) */


//6
/* Skriv en funktion, der tager en persons navn og alder og returnerer en beskrivelse. */

/* function nameAge (name, age) {
    return `Det her er ${name}, han er ${age} år gammel`
}

console.log(nameAge("John", 69)) */


//7
/* Lav en funktion, der tager et navn og et antal gange og udskriver navnet flere gange. */

/* function moreName (name, number) {
    return name.repeat(number);
}

console.log(moreName("Janus", 6)) */


//8
/* Skriv en funktion, der tager en radius og returnerer arealet af en cirkel. */

/* function radCir (radius) {
    return Math.PI * radius * radius;
}

console.log(radCir(5)) */


//9
/* Lav en funktion, der tager en pris og en rabatprocent og returnerer den nedsatte pris. */

/* function disPrice (price, discount) {
    return price - (price * (discount / 100));
}

console.log(disPrice(10, 2)); */


//10
/* Lav en funktion, der returnerer den sidste karakter i en streng. */

/* function returnString (str) {
    return str.charAt(str.length - 1);
}

console.log(returnString("Wassup")) */


//11
/* Skriv en funktion, der finder gennemsnittet af tre tal. */

/* function gennemsnit (num1, num2, num3) {
    return num1 + num2 + num3 / 3;
}

console.log(gennemsnit(3, 5, 7)); */


//12
/* Lav en funktion, der tager et tal og returnerer true, hvis det er et primtal. */

/* function isPrime (num) {
if (num <= 1) {
    return false;
}

for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
        return false; // Hvis num er deleligt med i, er det ikke et primtal
    }
}

return true; // Hvis ingen delelige tal findes, er det et primtal
}

console.log(isPrime(7));
console.log(isPrime(3));
console.log(isPrime(2));
console.log(isPrime(5));
console.log(isPrime(90)); */


//13
/* Skriv en funktion, der tager et array og returnerer det første element. */

/* function arr(array) {
return array[0];
}

console.log(arr(["Smith", "Blunt", "Feeble"])); */


//14
/* Lav en funktion, der returnerer et array med kvadratet af hvert tal i en liste. */

/* function returnKva (array, num) {
    return array[num]*num;
}

console.log(returnKva([1, 2, 3, 4, 5], 2)) */


//15
/* Skriv en funktion, der finder det længste ord i en sætning. */

/* function maxLength (sentence) {
    return word 
}

console.log(maxLength()) */