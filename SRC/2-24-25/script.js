
// an array of objects, each a different car with properties
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

// Function gets called when button clicked
function searchCarModel() {
    // Gets value entered in input
    const inputVal = document.getElementById('carModelInput').value;
    // Displays alert with entered model
    alert("Searching for: " + inputVal);
    //if (inputVal) {
//
    //}
}
// Adds event listener allows pressing "Enter" to trigger search
document.getElementById('carModelInput').addEventListener('keypress', function(event) {
    // Checks if pressed key = "Enter"
    if (event.key === "Enter") {
        // Calls the search function when Enter pressed
        searchCarModel();
    }
});

// Get dropdown element by ID
const carSelectorElement = document.getElementById("CarSelector");
// Clear existing options inside dropdown - removes "Change Me"
carSelectorElement.innerText = '';

// Get elements where selected car information 2b displayed
const makeModelDisplay = document.getElementById("MakeModel"); // Displays Make & Model
const typeDisplay = document.getElementById("type"); // Displays Car Type
const colorDisplay = document.getElementById("color"); // Displays Car Color
const tireDisplay = document.getElementById("tire"); // Displays Tire Brand

// Loop through each vehicle in cars array and adds ea. as option in dropdown
for (let i = 0; i < vehicles.length; i++) {
    let option = document.createElement("option"); // Create a new <option> element
    option.text = vehicles[i].model; // Set the text of the option to the car model
    option.value = i; // Set the value of the option to the index of the car in the array
    carSelectorElement.appendChild(option); // Add the option to the dropdown menu
}

// EVERYTHING  BELOW TO SIMILAR COMMENT ADDED BY AI ----------------------------------------------------------------------------------------------
// Add event listeners to detect both "change" and "click" events
carSelectorElement.addEventListener("change", updateCarDetails);
carSelectorElement.addEventListener("click", (event) => {
    // If the user clicks the currently selected option, manually update the details
    if (event.target.value === carSelectorElement.value) {
        updateCarDetails();
    }
});

// Function to update car details
function updateCarDetails() {
    let selectedCar = vehicles[carSelectorElement.value];

    // Update displayed text to show selected car's details
    makeModelDisplay.innerText = selectedCar.make + " " + selectedCar.model; // Show Make & Model
    typeDisplay.innerText = "Type: " + selectedCar.type; // Show Car Type
    colorDisplay.innerText = "Color: " + selectedCar.color; // Show Car Color
    tireDisplay.innerText = "Tire: " + selectedCar.tire; // Show Tire Brand
}

// Manually trigger change event on page load to display the first option
carSelectorElement.dispatchEvent(new Event("change"));
// EVERYTHING ABOVE FROM SIMILAR COMMENT ADDED BY AI -------------------------------------------------------------------------------------------

/// Add an event listener to dropdown to detect when user selects a car
carSelectorElement.addEventListener("change", (event) => {
    // Get selected vehicle based on dropdown value (index)
    let selectedCar = vehicles[event.target.value];

   // Update displayed text to show selected car's details
    makeModelDisplay.innerText = selectedCar.make + " " + selectedCar.model; // Show Make & Model
    typeDisplay.innerText = "Type: " + selectedCar.type; // Show Car Type
    colorDisplay.innerText = "Color: " + selectedCar.color; // Show Car Color
    tireDisplay.innerText = "Tire: " + selectedCar.tire; // Show Tire Brand
});

