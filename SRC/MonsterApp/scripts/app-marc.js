// abilitiesUL - imageContainerDIV - pokemonTextINPUT - searchingBUTTON

// create a getElementById for each area to show info on site
const abilitiesUL = document.getElementById("abilities");
const imageContainerDIV = document.getElementById("imageContainer");

// fetch, then, then, catch
fetch('https://pokeapi.co/api/v2/pokemon/eevee')
  .then(response => response.json()) // Convert response to JSON
  .then(data => {
    buildAbilitiesList(data.abilities); // Log the data - function defined below
    showSelectionImages(data.sprites); // Log the data - function defined below
  })
  .catch(error => console.error('Error:', error)); // Catch and log any errors

function buildAbilitiesList(abilities){
    abilities.forEach(element => {
        let li = document.createElement("li"); // createElement for each area on site
        li.innerHTML = element.ability.name;  // equate variable to data name
        abilitiesUL.appendChild(li);  // appendChild the const
    });
}

function showSelectionImages(sprites){
    let image = document.createElement("img"); // createElement for each area on site
    image.src = sprites.front_default;  // equate variable to data name
    imageContainerDIV.appendChild(image);  // appendChild the const
}
        
//Create a text field and button that allows the user to display results for a Pokemon they searched for. Hint - this means no longer hard coding a search for eevee and instead using a variable that contains the users input and fires when clicked

// create a getElementById for each area to show info on site
const searchingBUTTON = document.getElementById("searching");
const pokemonTextINPUT = document.getElementById("pokemonText");

searchingBUTTON.addEventListener("click", () => {
    const pokemonName = pokemonTextINPUT.value.toLowerCase().trim(); // Get user input and format it
    if (pokemonName) {
        fetchPokemonData(pokemonName); // function defined below
    } else {
        alert("Please enter a Pokémon name!"); // alert
    }
});
// fetch, then, then, catch
function fetchPokemonData(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();  // Convert response to JSON
        })
        .then(data => {
            abilitiesUL.innerHTML = ""; // Clear previous abilities
            imageContainerDIV.innerHTML = ""; // Clear previous image
            buildAbilitiesList(data.abilities); // Log the data - function defined previously
            showSelectionImages(data.sprites);  // Log the data - function defined previously
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Pokémon not found! Please try another name."); // alert
        });
}


