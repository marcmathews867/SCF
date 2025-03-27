const HomeSelectPanel = document.getElementById("HomeSelect");
const SelectPokemonPanel = document.getElementById("SelectPokemon");
const Slot1MonsterBtn = document.getElementById("Slot1");
const Slot2MonsterBtn = document.getElementById("Slot2");
const Slot1Selection = document.getElementById("Slot1Selection");
const BackButton = document.getElementById("BackButton");
const SelectButton = document.getElementById("SelectButton");
const abilitiesUL = document.getElementById("abilities");
const imageContainer = document.getElementById("imageContainer");
const monsterSelect = document.getElementById("SelectMonster");
const statsContainer = document.createElement("div"); // New container for stats
statsContainer.id = "statsContainer";
SelectPokemonPanel.appendChild(statsContainer); // Append it to the body (or place it elsewhere)

let currentSlot;
let currentSelection = {};
let slot1Selection = {};
let slot2Selection = {};

// Shows panel and sets the current save slot
Slot1MonsterBtn.addEventListener("click", () => {
  ShowSelectPanel(1);
});

Slot2MonsterBtn.addEventListener("click", () => {
  ShowSelectPanel(2);
});
BackButton.addEventListener("click", () => {
  ShowHomePanel();
});
SelectButton.addEventListener("click", () => {
  if (currentSlot === 1) {
    slot1Selection = { ...currentSelection }; // Create a new object instead of a reference
  } else if (currentSlot === 2) {
    slot2Selection = { ...currentSelection };
  }
  ShowHomePanel();
});


function ShowHomePanel() {
  HomeSelectPanel.style.visibility = "visible";
  SelectPokemonPanel.style.visibility = "hidden";

  if (currentSlot === 1 && slot1Selection.sprite) {
    let img = document.createElement("img");
    img.src = slot1Selection.sprite;
    Slot1Selection.innerHTML = "";
    Slot1Selection.appendChild(img);
  } else if (currentSlot === 2 && slot2Selection.sprite) {
    let img = document.createElement("img");
    img.src = slot2Selection.sprite;
    Slot2Selection.innerHTML = "";
    Slot2Selection.appendChild(img);
  }
}

function ShowSelectPanel(slotNumber){
  currentSlot = slotNumber;
  HomeSelectPanel.style.visibility = 'hidden';
  SelectPokemonPanel.style.visibility = 'visible';
}

function GetOneMonster(monster) {
  fetch("https://pokeapi.co/api/v2/pokemon/" + monster)
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
      //BuildAbilitiesList(data.abilities);
      SetCurrentSelection(data);
      ShowSelectionImages(data.sprites);
      DisplayStatsAndTypes(data.types, data.stats);
    }) // Log the data
    .catch(error => console.error("Error:", error)); // Catch and log any errors
}

function SetCurrentSelection(data){
  currentSelection.sprite = data.sprites.front_default;
  currentSelection.types = data.types;
  currentSelection.stats = data.stats;
}

fetch("https://pokeapi.co/api/v2/pokemon/")
  .then(response => response.json()) // Convert response to JSON
  .then(data => BuildMonsterSelectOptions(data.results)) // Populate dropdown
  .catch(error => console.error("Error:", error)); // Catch and log any

function BuildAbilitiesList(abilities) {
  abilitiesUL.innerHTML = "";
  abilities.forEach(element => {
    let li = document.createElement("li");
    li.innerHTML = element.ability.name;
    abilitiesUL.appendChild(li);
  });
}

function ShowSelectionImages(sprites) {
  imageContainer.innerHTML = "";
  let image = document.createElement("img");
  image.src = sprites.front_default;
  imageContainer.appendChild(image);
}

function DisplayStatsAndTypes(types, stats) {
  statsContainer.innerHTML = ""; // Clear previous stats

  // Display Types
  let typesHeader = document.createElement("h3");
  typesHeader.textContent = "Type(s):";
  statsContainer.appendChild(typesHeader);

  let typesList = document.createElement("ul");
  types.forEach(type => {
    let typeItem = document.createElement("li");
    typeItem.textContent = type.type.name;
    typesList.appendChild(typeItem);
  });
  statsContainer.appendChild(typesList);

  // Display Base Stats
  let statsHeader = document.createElement("h3");
  statsHeader.textContent = "Base Stats:";
  statsContainer.appendChild(statsHeader);

  let statsList = document.createElement("ul");
  stats.forEach(stat => {
    let statItem = document.createElement("li");
    statItem.textContent = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;
    statsList.appendChild(statItem);
  });
  statsContainer.appendChild(statsList);
}

function BuildMonsterSelectOptions(monsterOptions) {
  monsterOptions.forEach(element => {
    let option = document.createElement("option");
    option.innerHTML = element.name;
    option.value = element.name;
    monsterSelect.appendChild(option);
  });
}

monsterSelect.addEventListener("change", event => {
  GetOneMonster(event.target.value);
});
