let vehicles = [
    { type: "Crossover", color: "red", tire: "Goodyear", make: "Toyota", model: "Rav 4" },
    { type: "Truck", color: "red", tire: "Goodyear", make: "Toyota", model: "Tacoma" },
    { type: "Sedan", color: "blue", tire: "Michelin", make: "Honda", model: "Accord" },
    { type: "SUV", color: "black", tire: "Bridgestone", make: "Ford", model: "Explorer" },
    { type: "Truck", color: "white", tire: "Continental", make: "Chevrolet", model: "Silverado" },
    { type: "Coupe", color: "yellow", tire: "Pirelli", make: "Chevrolet", model: "Camaro" },
    { type: "Hatchback", color: "green", tire: "Dunlop", make: "Volkswagen", model: "Golf" },
    { type: "Van", color: "silver", tire: "Goodyear", make: "Chrysler", model: "Pacifica" },
    { type: "Convertible", color: "red", tire: "Bridgestone", make: "Mazda", model: "MX-5 Miata" },
    { type: "Sedan", color: "gray", tire: "Michelin", make: "BMW", model: "3 Series" },
    { type: "SUV", color: "blue", tire: "Pirelli", make: "Jeep", model: "Grand Cherokee" },
    { type: "Truck", color: "black", tire: "Goodyear", make: "Ram", model: "1500" },
    { type: "Crossover", color: "white", tire: "Continental", make: "Subaru", model: "Outback" },
    { type: "SUV", color: "red", tire: "Dunlop", make: "Hyundai", model: "Tucson" },
    { type: "Sedan", color: "black", tire: "Pirelli", make: "Mercedes-Benz", model: "C-Class" },
    { type: "Hatchback", color: "white", tire: "Michelin", make: "Honda", model: "Civic" },
    { type: "Coupe", color: "gray", tire: "Goodyear", make: "Ford", model: "Mustang" },
    { type: "Truck", color: "silver", tire: "Bridgestone", make: "GMC", model: "Sierra" },
    { type: "Crossover", color: "green", tire: "Dunlop", make: "Nissan", model: "Rogue" },
    { type: "Van", color: "blue", tire: "Goodyear", make: "Toyota", model: "Sienna" },
    { type: "Convertible", color: "yellow", tire: "Michelin", make: "Chevrolet", model: "Corvette" },
    { type: "Sedan", color: "brown", tire: "Pirelli", make: "Audi", model: "A4" },
    { type: "Truck", color: "red", tire: "Bridgestone", make: "Ford", model: "F-150" },
    { type: "SUV", color: "black", tire: "Continental", make: "Chevrolet", model: "Tahoe" },
    { type: "Hatchback", color: "gray", tire: "Dunlop", make: "Hyundai", model: "Veloster" },
    { type: "Coupe", color: "blue", tire: "Michelin", make: "BMW", model: "M4" },
    { type: "Truck", color: "white", tire: "Goodyear", make: "Nissan", model: "Frontier" },
    { type: "SUV", color: "green", tire: "Pirelli", make: "Jeep", model: "Wrangler" },
    { type: "Convertible", color: "silver", tire: "Dunlop", make: "Mercedes-Benz", model: "SL-Class" },
    { type: "Crossover", color: "gray", tire: "Bridgestone", make: "Volkswagen", model: "Tiguan" },
    { type: "Van", color: "black", tire: "Goodyear", make: "Dodge", model: "Grand Caravan" },
    { type: "Sedan", color: "blue", tire: "Michelin", make: "Tesla", model: "Model S" },
    { type: "SUV", color: "white", tire: "Continental", make: "Toyota", model: "Highlander" },
    { type: "Hatchback", color: "red", tire: "Dunlop", make: "Ford", model: "Focus" },
    { type: "Coupe", color: "black", tire: "Pirelli", make: "Chevrolet", model: "Camaro ZL1" },
    { type: "Truck", color: "silver", tire: "Bridgestone", make: "Honda", model: "Ridgeline" },
    { type: "Convertible", color: "gold", tire: "Goodyear", make: "Jaguar", model: "F-Type" }
];

const carSelectorElement = document.getElementById("CarSelector");
carSelectorElement.innerHTML = '';

const makeModelDisplay = document.getElementById("MakeModel");
const typeDetailsDisplay = document.getElementById("type");
const colorDetailsDisplay = document.getElementById("color");
const tireDetailsDisplay = document.getElementById("tire");


for(i=0; i < vehicles.length; i++) {
    let option = document.createElement("option");
    option.text = vehicles[i].model;
    option.value = i;

    carSelectorElement.appendChild(option);
}

carSelectorElement.addEventListener("change", (event) => {
    let message = vehicles[event.target.value].make + " " + vehicles[event.target.value].model;
    let otherMessage = "TYPE: " + vehicles[event.target.value].type; //+ " " + vehicles[event.target.value].color + " " + vehicles[event.target.value].tire;
    let anotherMessage = "COLOR: " + vehicles[event.target.value].color;
    let oneMoreMessage = "TIRE: " + vehicles[event.target.value].tire;
    makeModelDisplay.innerText = message;
    typeDetailsDisplay.innerText = otherMessage;
    colorDetailsDisplay.innerText = anotherMessage;
    tireDetailsDisplay.innerText = oneMoreMessage;



    //TODO1: create list item elements for each vehicle property and append them to the CarDetailsDisplay innerHTML - show make and model and list other details
    //TODO2: Try to build a search function to display vehicle info based on make typed in by the user. This will require a text input and a button with a click event handler. Give this one your best shot on your own



});




console.log(vehicles.length); // Should print 37


//option = document.createElement("option");
//option.text = vehicles[1].model;
//option.value = vehicles[1].model.trim();
//carSelectorElement.appendChild(option);


