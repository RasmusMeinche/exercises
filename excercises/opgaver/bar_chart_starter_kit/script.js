const veh = [
    {type: "Bus", fuel: "Diesel", passengers: 45, stops: ["Nørrebrograde", "Elmegade"]},
    {type: "Bil", fuel: "Benzin", passengers: 4, ownedBy: "Klaus"},
    {type: "Cykel", fuel: "Rugbrød", passengers: 0, ownedBy: "Jonas", isElectric: true},
    {type: "Bil", passengers: 5, ownedBy: "Elon", isElectric: true},
    {type: "MC", fuel: "Benzin", passengers: 2, ownedBy: "Fonda"},
    {type: "Cykel", fuel: "Rugbrød", passengers: 2, ownedBy: "Vingegård", isTandem: true},
    {type: "MC", fuel: "Benzin", passengers: 2, ownedBy: "Yolanda"},
    {type: "Knallert", fuel: "Benzin", passengers: 1, ownedBy: "Børge"},
    {type: "Knallert", fuel: "Benzin", passengers: 1, ownedBy: "Jonas"},
    {type: "Løbehjul", passengers: 1, isElectric: true},
];

const tbodyPointer = document.querySelector("tbody");

const allElectricVehicle = veh.filter((vehicle) => vehicle.isElectric === true);
const moreSeats = veh.filter((vehicle) => vehicle.passengers === 2 || vehicle.passengers === 3 || vehicle.passengers === 4 || vehicle.passengers === 5);
const ownerByJonas = veh.filter((vehicle) => vehicle.ownedBy === "Jonas");
const allBreadFuel = veh.filter((vehicle) => vehicle.fuel === "Rugbrød" && vehicle.passengers === 2);

function filterVehicles () {
    if (allElectricVehicle === true) {
        showTheseVehicles(allElectricVehicle);
    }
}

showTheseVehicles(moreSeats);

function showTheseVehicles(arr) {
    arr.forEach(each => {
        tbodyPointer.innerHTML += `<tr>
        <td>${each.type}</td>
        <td>${each.fuel}</td>
        <td>${each.passengers}</td>
        <td>${each.stops}</td>
        <td>${each.ownedBy}</td>
        <td>${each.isElectric}</td>
        <td>${each.isTandem}</td>
    </tr>`;
    });
}