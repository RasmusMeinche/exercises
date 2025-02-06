const veh = [
  { type: "Bus", fuel: "Diesel", passengers: 45, stops: ["Nørrebrogade", "Elmegade"] },
  { type: "Bil", fuel: "Benzin", passengers: 4, ownedBy: "Klaus" },
  { type: "Cykel", fuel: "Rugbrød", passengers: 0, ownedBy: "Jonas", isElectric: true },
  { type: "Bil", passengers: 5, ownedBy: "Elon", isElectric: true },
  { type: "MC", fuel: "Benzin", passengers: 2, ownedBy: "Fonda" },
  { type: "Cykel", fuel: "Rugbrød", passengers: 2, ownedBy: "Vingegård", isTandem: true },
  { type: "MC", fuel: "Benzin", passengers: 2, ownedBy: "Yolanda" },
  { type: "Knallert", fuel: "Benzin", passengers: 1, ownedBy: "Børge" },
  { type: "Knallert", fuel: "Benzin", passengers: 1, ownedBy: "Jonas" },
  { type: "Løbehjul", passengers: 1, isElectric: true },
];
const tbodyPointer = document.querySelector("tbody");

const allElectricVehicle = veh.filter((vehicle) => vehicle.isElectric === true);
const moreSeats = veh.filter((vehicle) => vehicle.passengers > 2);
const ownerByJonas = veh.filter((vehicle) => vehicle.ownedBy === "Jonas" && vehicle.isElectric === true);
const allBreadFuel = veh.filter((vehicle) => vehicle.fuel === "Rugbrød" && vehicle.passengers > 1);

document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click",()=>{filterHandler(btn.dataset.filter)} );
});

function filterHandler(filter) {
  console.log("filterHandler", filter);
  let filterdArr;
  switch (filter) {
    case "all":
      filterdArr = veh;
      break;
    case "isElectric":
/*       filterdArr = veh.filter((vehicle) => vehicle.isElectric); */
      filterdArr = allElectricVehicle;
      break;
      case "moreThanOnePass":
/*         filterdArr = veh.filter((vehicle) => vehicle.passengers > 1); */
        filterdArr = moreSeats;
        break;
      case "JonasOwnedElVeh":
/*         filterdArr = veh.filter((vehicle) => vehicle.ownedBy === "Jonas" && vehicle.isElectric); */
        filterdArr = ownerByJonas;
        break;
      case "ryebread":
      /*   filterdArr = veh.filter((vehicle) => vehicle.fuel === "Rugbrød" && vehicle.passengers > 1); */
      filterdArr = allBreadFuel;
        break;
  }
  
  showTheseVehicles(filterdArr)
};


/* Tager undefined ud*/


showTheseVehicles(veh);

function showTheseVehicles(arr) {
  tbodyPointer.innerHTML = "";
  arr.forEach((each) => {
    tbodyPointer.innerHTML += `<tr>
  <td>${beautify(each.type)}</td>
  <td>${beautify(each.fuel)}</td>
  <td>${beautify(each.passengers)}</td> 
  <td>${beautify(each.stops)}</td>
  <td>${beautify(each.ownedBy)}</td>
  <td>${beautify(each.isElectric)}</td> 
  <td>${beautify(each.isTandem)}</td>
</tr>`;
  });
/*   document.querySelectorAll("td").forEach((cell) => {
    if (cell.innerHTML === "undefined") {
      cell.innerHTML = "";
    }
  }); */
}

function beautify(str){
  switch (str) {
    case undefined:
    str = "-";
    break;
    case true:
      str = "X";
      break;
    }
 /*  if (str === undefined) {
    str = "";
  }
  if (str === true) {
    str = "X"
  } */
  return str;
};