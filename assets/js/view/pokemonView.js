export class PokemonView {
  elementPokemonList;

  constructor(elementPokemonList) {
    this.elementPokemonList = elementPokemonList;
  }

  template(pokemon) {
    return `
        <li class="${pokemon.principalType} pokemon" data-id=${pokemon.id}>
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types
                  ?.map(
                    (type) => `
                <li class="${pokemon.principalType} type">${type}</li>
                `
                  )
                  .join("")}
            </ol>

            <img src="${pokemon.photo}"
                alt=${pokemon.name}>
        </div>
    </li>
`;
  }
  view(pokemonList) {
    this.elementPokemonList.innerHTML = pokemonList
      .map((pokemon) => this.template(pokemon))
      .join("");

    
  
  }
  updateView(pokemonList) {
    this.elementPokemonList.innerHTML += pokemonList
      .map((pokemon) => this.template(pokemon))
      .join("");
  }

  
}
