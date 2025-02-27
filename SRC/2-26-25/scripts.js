const carSelectorElement = document.getElementById("CarSelector");
carSelectorElement.innerHTML = "";

const makeModelDisplay = document.getElementById("MakeModel");
const carDetailsDisplay = document.getElementById("CarDetails");
const makeSearchButton = document.getElementById("MakeSearchButton");
const makeSearchInput = document.getElementById("MakeSearch");

for(i = 0; i < vehicles.length; i++){
    let option = document.createElement("option");
    option.text = vehicles[i].model;
    option.value = i;
    
    carSelectorElement.appendChild(option);
}

carSelectorElement.addEventListener("change", (event) => {
    let message = vehicles[event.target.value].make + " " + vehicles[event.target.value].model;
    makeModelDisplay.innerText = message;

    // TODO: create list item elements for each vechicle property and append them
    // to the  carDetialsDisplay innerHTML
});

makeSearchButton.addEventListener("click", (event) => {
    event.preventDefault();

    let result = SearchMake(makeSearchInput.value);
    console.log(result);
    ShowSearchResults(result);
});

function SearchMake (makeToFind){
    let results = [];
    for(i = 0; i < vehicles.length; i++){
        if(makeToFind == vehicles[i].make){
            results.push(vehicles[i]);
        }
    }
    return results;
}

function ShowSearchResults(resultsToShow){
    carDetailsDisplay.innerHTML = "";

    resultsToShow.forEach(result => {
        console.log(result.model);
        carDetailsDisplay.innerHTML += "<p>Make: " + result.make + " Model: " + result.model + "</p>";
    });
}
