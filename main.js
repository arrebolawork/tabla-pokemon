let listOfPokemons = [];
const searchInput = document.querySelector("#searchInput");
async function getPokemons() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
  const data = await response.json();
  listOfPokemons = data.results;
  renderTable(listOfPokemons);
}
function renderTable(listOfPokemons) {
  const tablebody = document.getElementById("tablebody");
  tablebody.innerHTML = "";
  listOfPokemons.forEach((pokemon, index) => {
    const trItem = document.createElement("tr");
    const tditem1 = document.createElement("td");
    tditem1.textContent = index + 1;
    const tditem2 = document.createElement("td");
    tditem2.textContent = pokemon.name;
    const tditem3 = document.createElement("td");
    const btnTable = document.createElement("button");
    btnTable.textContent = `${pokemon.name} info`;
    btnTable.className = "btn btn-success";
    btnTable.addEventListener("click", () => {
      fetch(`${pokemon.url}`)
        .then((response) => response.json())
        .then((data) => pokemonRenderInfo(data));
    });
    tditem3.appendChild(btnTable);

    trItem.appendChild(tditem1);
    trItem.appendChild(tditem2);
    trItem.appendChild(tditem3);

    tablebody.appendChild(trItem);
  });
}
function pokemonRenderInfo(pokemon) {
  const pokemonInfo = document.getElementById("pokemonInfo");
  pokemonInfo.innerHTML = "";
  pokemonInfo.innerHTML = `<div class="card" style="width: 18rem;">
  <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
  <div class="card-body ">
  <p class="card-text text-uppercase fw-bold">${pokemon.name}</p>
    <p class="card-text">Id: ${pokemon.id}</p>
    <p class="card-text">Weight: ${pokemon.weight}</p>
    <p class="card-text">Height: ${pokemon.height}</p>
  </div>
</div>`;
}
function pokemonsSearching(e) {
  const pokemonListFiltered = listOfPokemons.filter((pokemon) => pokemon.name.includes(e.target.value));
  renderTable(pokemonListFiltered);
}
searchInput.addEventListener("keyup", pokemonsSearching);
document.addEventListener("DOMContentLoaded", getPokemons);
