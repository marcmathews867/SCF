// Selecting HTML elements by their IDs to interact with them in JavaScript
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

// Creating a container for displaying stats
const statsContainer = document.createElement("div");
statsContainer.id = "statsContainer";
SelectPokemonPanel.appendChild(statsContainer);

// Variables to track selection
let currentSlot = null; // Stores the selected slot
let currentSelection = {}; // Stores the currently selected Pokémon
let slot1Selection = {}; // Stores Pokémon for Slot 1
let slot2Selection = {}; // Stores Pokémon for Slot 2

// Event listener for Slot 1 button
Slot1MonsterBtn.addEventListener("click", () => {
  console.log("Slot 1 clicked"); // Debugging
  ShowSelectPanel(1);
});

// Event listener for Slot 2 button
Slot2MonsterBtn.addEventListener("click", () => {
  console.log("Slot 2 clicked"); // Debugging
  ShowSelectPanel(2);
});

// Event listener for Back button
BackButton.addEventListener("click", () => {
  console.log("Back button clicked"); // Debugging
  ShowHomePanel();
});

// Event listener for Select button (saves selection to chosen slot)
SelectButton.addEventListener("click", () => {
  console.log("Select button clicked"); // Debugging
  if (currentSlot === 1) {
    slot1Selection = { ...currentSelection }; // Save selection for Slot 1
  } else if (currentSlot === 2) {
    slot2Selection = { ...currentSelection }; // Save selection for Slot 2
  }
  console.log("Saved selections:", slot1Selection, slot2Selection); // Debugging
  ShowHomePanel();
});

// Function to display the home panel and update slot images
function ShowHomePanel() {
  console.log("Showing home panel"); // Debugging
  HomeSelectPanel.style.visibility = "visible";
  SelectPokemonPanel.style.visibility = "hidden";

  // Update Slot 1 image if a Pokémon was selected
  if (slot1Selection.sprite) {
    let img = document.createElement("img");
    img.src = slot1Selection.sprite;
    Slot1Selection.innerHTML = "";
    Slot1Selection.appendChild(img);
  }

  // Update Slot 2 image if a Pokémon was selected
  if (slot2Selection.sprite) {
    let img = document.createElement("img");
    img.src = slot2Selection.sprite;
    Slot2Selection.innerHTML = "";
    Slot2Selection.appendChild(img);
  }
}

// Function to show the Pokémon selection panel
function ShowSelectPanel(slotNumber) {
  console.log("Showing selection panel for slot:", slotNumber); // Debugging
  currentSlot = slotNumber; // Store selected slot
  HomeSelectPanel.style.visibility = "hidden";
  SelectPokemonPanel.style.visibility = "visible";
}

// Function to fetch Pokémon data from API
function GetOneMonster(monster) {
  console.log("Fetching data for:", monster); // Debugging
  fetch("https://pokeapi.co/api/v2/pokemon/" + monster)
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
      console.log("Received data:", data); // Debugging
      SetCurrentSelection(data);
      ShowSelectionImages(data.sprites);
      DisplayStatsAndTypes(data.types, data.stats);
    })
    .catch(error => console.error("Error:", error));
}

// Function to store the selected Pokémon details
function SetCurrentSelection(data) {
  console.log("Setting current selection:", data); // Debugging
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
  console.log("Displaying sprite:", sprites.front_default); // Debugging
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

// Function to populate Pokémon selection dropdown
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
  console.log("Selected Pokémon:", event.target.value); // Debugging
  GetOneMonster(event.target.value);
});
