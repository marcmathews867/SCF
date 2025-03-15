// abilitiesUL - imageContainerDIV - pokemonTextINPUT - searchingBUTTON

const abilitiesUL = document.getElementById("abilities");
const imageContainerDIV = document.getElementById("imageContainer");

fetch('https://pokeapi.co/api/v2/pokemon/eevee')
  .then(response => response.json()) // Convert response to JSON
  .then(data => {
    buildAbilitiesList(data.abilities); // Log the data
    showSelectionImages(data.sprites);
  })
  .catch(error => console.error('Error:', error)); // Catch and log any errors

function buildAbilitiesList(abilities){
    abilities.forEach(element => {
        let li = document.createElement("li");
        li.innerHTML = element.ability.name;
        abilitiesUL.appendChild(li);
    });
}

function showSelectionImages(sprites){
    let image = document.createElement("img");
    image.src = sprites.front_default;
    imageContainerDIV.appendChild(image);
}
        
//Create a text field and button that allows the user to display results for a Pokemon they searched for. Hint - this means no longer hard coding a search for eevee and instead using a variable that contains the users input and fires when clicked
const searchingBUTTON = document.getElementById("searching");
const pokemonTextINPUT = document.getElementById("pokemonText");

searchingBUTTON.addEventListener("click", () => {
    const pokemonName = pokemonTextINPUT.value.toLowerCase().trim(); // Get user input and format it
    if (pokemonName) {
        fetchPokemonData(pokemonName);
    } else {
        alert("Please enter a Pokémon name!");
    }
});

function fetchPokemonData(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then(data => {
            abilitiesUL.innerHTML = ""; // Clear previous abilities
            imageContainerDIV.innerHTML = ""; // Clear previous image
            buildAbilitiesList(data.abilities);
            showSelectionImages(data.sprites);
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Pokémon not found! Please try another name.");
        });
}


