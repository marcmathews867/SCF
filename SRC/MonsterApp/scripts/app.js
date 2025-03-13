const abilitiesUL = document.getElementById("abilities");
const spritesUL = document.getElementById("sprites");

fetch('https://pokeapi.co/api/v2/pokemon/eevee')
  .then(response => response.json()) // Convert response to JSON
  .then(data => buildAbilitiesList(data.abilities)) // Log the data
  .catch(error => console.error('Error:', error)); // Catch and log any errors

function buildAbilitiesList(abilities){
    abilities.forEach(element => {
        let li = document.createElement("li");
        li.innerHTML = element.ability.name;
        abilitiesUL.appendChild(li);
        //console.log(element.ability.name);
    });
}

fetch('https://pokeapi.co/api/v2/pokemon/eevee')
  .then(response => response.json()) // Convert response to JSON
  .then(data => buildAbilitiesList(data.sprites)) // Log the data
  .catch(error => console.error('Error:', error)); // Catch and log any errors

function buildAbilitiesList(sprites){
    abilities.forEach(element => {
        let li = document.createElement("li");
        li.innerHTML = element.ability.sprites;
        spritesUL.appendChild(li);
        //console.log(element.ability.name);
    });
}
        
        
        
        
        
        //for (i=0; i < abilities.length; i++)
            //if () {
            //    return abilities.sprites[i];
            //}