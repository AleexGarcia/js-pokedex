export class PokemonReposity {
  pokemonList = [];
  addPokemonsList(pokemonList) {
    this.pokemonList.push(...pokemonList);
  }
  getPokemon(id) {
    return this.pokemonList.find((pokemon) => pokemon.id === id);
  }
}
