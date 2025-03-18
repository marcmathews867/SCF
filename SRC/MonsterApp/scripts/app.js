const abilitiesUL = document.getElementById("abilities");
const imageContainer = document.getElementById("imageContainer");
const monsterSelect = document.getElementById("SelectMonster");

function GetOneMonster(monster){
  fetch('https://pokeapi.co/api/v2/pokemon/' + monster)
  .then(response => response.json()) // Convert response to JSON
  .then(data => {
    BuildAbilitiesList(data.abilities);
    ShowSelectionImages(data.sprites);
  }) // Log the data
  .catch(error => console.error('Error:', error)); // Catch and log any errors
}

fetch('https://pokeapi.co/api/v2/pokemon/')
  .then(response => response.json()) // Convert response to JSON
  .then(data => BuildMonsterSelectOptions(data.results)) // Log the data
  .catch(error => console.error('Error:', error)); // Catch and log any

function BuildAbilitiesList(abilities){
  abilitiesUL.innerHTML = "";
  abilities.forEach(element => {
    let li = document.createElement("li");
    li.innerHTML = element.ability.name;
    abilitiesUL.appendChild(li);
  });
}

function ShowSelectionImages(sprites){
  imageContainer.innerHTML = "";
  let image = document.createElement("img");
  image.src = sprites.front_default;
  imageContainer.appendChild(image);
}

function BuildMonsterSelectOptions(monsterOptions){
  monsterOptions.forEach(element => {
    let option = document.createElement("option");
    option.innerHTML = element.name;
    option.value = element.name;
    monsterSelect.appendChild(option);
  });
}

monsterSelect.addEventListener("change", (event) => {
  GetOneMonster(event.target.value);
});

//The wrong way
//let data = fetch('https://pokeapi.co/api/v2/pokemon/eevee');
//console.log(data);