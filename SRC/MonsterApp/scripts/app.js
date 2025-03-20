const HomeSelectPanel = document.getElementById("HomeSelect");
const SelectPokemonPanel = document.getElementById("SelectPokemon");
const Slot1MonsterBtn = document.getElementById("Slot1");
const Slot2MonsterBtn = document.getElementById("Slot2");
const abilitiesUL = document.getElementById("abilities");
const imageContainer = document.getElementById("imageContainer");
const monsterSelect = document.getElementById("SelectMonster");
const pokemonName = document.getElementById("pokemonName");
const pokemonType = document.getElementById("pokemonType");
const statsUL = document.getElementById("stats");

document.getElementById("searching").addEventListener("click", () => {
    const monster = document.getElementById("pokemonText").value.toLowerCase();
    GetOneMonster(monster);
});

Slot1MonsterBtn.addEventListener("click", () => {
  ShowSelectPanel();
});
Slot2MonsterBtn.addEventListener("click", () => {
  ShowSelectPanel();
});

function ShowHomePanel(){
  HomeSelectPanel.style.visibility = 'visible';
  SelectPokemonPanel.style.visibility = 'hidden';
}
function ShowSelectPanel(){
  HomeSelectPanel.style.visibility = 'hidden';
  SelectPokemonPanel.style.visibility = 'visible';
}

function GetOneMonster(monster) {
    fetch('https://pokeapi.co/api/v2/pokemon/' + monster)
        .then(response => response.json())
        .then(data => {
            DisplayPokemonInfo(data);
        })
        .catch(error => console.error('Error:', error));
}

function DisplayPokemonInfo(data) {
    pokemonName.innerHTML = data.name.toUpperCase();
    pokemonType.innerHTML = "Type: " + data.types.map(t => t.type.name).join(", ");
    BuildAbilitiesList(data.abilities);
    ShowSelectionImages(data.sprites);
    BuildStatsList(data.stats);
}

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

function BuildStatsList(stats) {
    statsUL.innerHTML = "";
    stats.forEach(stat => {
        let li = document.createElement("li");
        li.innerHTML = `${stat.stat.name}: ${stat.base_stat}`;
        statsUL.appendChild(li);
    });
}

fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(response => response.json())
    .then(data => BuildMonsterSelectOptions(data.results))
    .catch(error => console.error('Error:', error));

function BuildMonsterSelectOptions(monsterOptions) {
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