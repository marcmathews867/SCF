// Selecting elements by IDs - there are 11 IDs within index.html
const HomeSelectPanel = document.getElementById("HomeSelect");
const SelectPokemonPanel = document.getElementById("SelectPokemon");
const Slot1MonsterBtn = document.getElementById("Slot1");
const Slot2MonsterBtn = document.getElementById("Slot2");
const Slot1Selection = document.getElementById("Slot1Selection");
const Slot2Selection = document.getElementById("Slot2Selection");
const BackButton = document.getElementById("BackButton");
const SelectButton = document.getElementById("SelectButton");
const abilitiesUL = document.getElementById("abilities");
const imageContainer = document.getElementById("imageContainer");
const monsterSelect = document.getElementById("SelectMonster");

// Creating a container for displaying stats              // Why create this way instead of div in html???
const statsContainer = document.createElement("div");
statsContainer.id = "statsContainer";                     // Why this line needed???
SelectPokemonPanel.appendChild(statsContainer);

// Variables 2 track selection
let currentSlot = null; // Stores selected slot
let currentSelection = {}; // Stores currently selected
let slot1Selection = {}; // Stores chosen for Slot 1
let slot2Selection = {}; // Stores selected for Slot 2

// Event listener for Slot 1 button
Slot1MonsterBtn.addEventListener("click", () => {
  //console.log("Slot 1 clicked"); // Debug
  ShowSelectPanel(1);
});

// Event listener for Slot 2 button
Slot2MonsterBtn.addEventListener("click", () => {
  ShowSelectPanel(2);
});

// Event listener for Back button
BackButton.addEventListener("click", () => {
  //console.log("Back button clicked"); // Debug
  ShowHomePanel();
});

// Event listener for Select button - saves selection to correct slot
SelectButton.addEventListener("click", () => {
  if (currentSlot === 1) {
    slot1Selection = { ...currentSelection }; // Save selection for Slot 1
  } else if (currentSlot === 2) {
    slot2Selection = { ...currentSelection }; // Save selection for Slot 2
  }  // NOTE: ensures slot2Selection gets new independent copy of currentSelection, avoiding unwanted side effects from reference sharing
  //console.log("Saved selections:", slot1Selection, slot2Selection); // Debug
  ShowHomePanel();
});

// Function 4 home panel display and 2 update slot images
function ShowHomePanel() {
  HomeSelectPanel.style.visibility = "visible";
  SelectPokemonPanel.style.visibility = "hidden";

  // Update Slot 1 image if selection made
  if (slot1Selection.sprite) {
    let img = document.createElement("img");
    img.src = slot1Selection.sprite;
    Slot1Selection.innerHTML = "";
    Slot1Selection.appendChild(img);
  }

  // Update Slot 2 image if selection
  if (slot2Selection.sprite) {
    let img = document.createElement("img");
    img.src = slot2Selection.sprite;
    Slot2Selection.innerHTML = "";
    Slot2Selection.appendChild(img);
  }
}

// Function to show the Pokémon selection panel
function ShowSelectPanel(slotNumber) {
  //console.log("Showing selection panel for slot:", slotNumber); // Debug
  currentSlot = slotNumber; // Store selected slot
  HomeSelectPanel.style.visibility = "hidden";
  SelectPokemonPanel.style.visibility = "visible";
}

// Function to fetch Pokemon data from API
function GetOneMonster(monster) {
  //console.log("Fetching data for:", monster); // Debug
  fetch("https://pokeapi.co/api/v2/pokemon/" + monster)
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
      //console.log("Received data:", data); // Debug
      SetCurrentSelection(data);
      ShowSelectionImages(data.sprites);
      DisplayStatsAndTypes(data.types, data.stats);
    })
    .catch(error => console.error("Error:", error));
}

// Function to store selected Pokemon details
function SetCurrentSelection(data) {
  currentSelection = {
    sprite: data.sprites.front_default,
    types: data.types,
    stats: data.stats,
  };
}

// Fetches the list of Pokémon names for the dropdown menu
fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  .then(response => response.json())
  .then(data => BuildMonsterSelectOptions(data.results))
  .catch(error => console.error("Error:", error));

// Function to display Pokémon image
function ShowSelectionImages(sprites) {
  imageContainer.innerHTML = "";
  let image = document.createElement("img");
  image.src = sprites.front_default;
  imageContainer.appendChild(image);
}

// Function to display Pokémon stats and types
function DisplayStatsAndTypes(types, stats) {
  statsContainer.innerHTML = "";

  // Display Pokémon types
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

  // Display Pokémon base stats
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

// Function to populate Pokemon selection dropdown
function BuildMonsterSelectOptions(monsterOptions) {
  monsterOptions.forEach(element => {
    let option = document.createElement("option");
    option.innerHTML = element.name;
    option.value = element.name;
    monsterSelect.appendChild(option);
  });
}

// Event listener for Pokémon selection dropdown
monsterSelect.addEventListener("change", event => {
  GetOneMonster(event.target.value);
});
