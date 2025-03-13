const abilitiesUL = document.getElementById("abilities");
const spritesDIV = document.getElementById("imageContainer");

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
        //console.log(element.ability.name);
    });
}

function showSelectionImages(sprites){
    let image = document.createElement("img");
    image.src = sprites.front_default;
    spritesDIV.appendChild(image);
}
        
