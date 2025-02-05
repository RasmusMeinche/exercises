const animals = [{name: "Mandu", type: "cat"}, {name: "Fido", type: "dog"}, {name: "Pjevs", type: "cat"}, {name: "Mia", type: "dog"}];

function isCat(animal) {
    if (animal.type === "cat") {
        return true;
    }
    else {
        return false;
    }
}

function all (animal) {
    return true;
}
function none (animal) {
    return false;
}

/* console.log("ALL", animals.filter(all));
console.log("NONE", animals.filter(none)); */
console.log("CATS", animals.filter(isCat));

function isDog(animal) {
    if (animal.type === "dog") {
        return true;
    }
    else {
        return false;
    }
}

console.log("DOGS", animals.filter(isDog));