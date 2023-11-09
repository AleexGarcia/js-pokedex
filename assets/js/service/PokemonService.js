import { Pokemon } from "../model/pokemonModel.js";
export class PokemonService {
  convertPokemonApiToPokemon(pokemonDetail) {
    const pokemon = new Pokemon();
     pokemon.id = pokemonDetail.id;
     pokemon.moves = pokemonDetail.moves.map((el) => el.move.name);
     pokemon.baseStatus = pokemonDetail.stats.map((el) => ({
      name: el.stat.name,
      value: el.base_stat,
    }));
     pokemon.height = pokemonDetail.height;
     pokemon.weight = pokemonDetail.weight;
     pokemon.abilities = pokemonDetail.abilities.map(el => el.ability.name);
     pokemon.name = pokemonDetail.name;
     pokemon.number = pokemonDetail.id;
     pokemon.types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
     pokemon.principalType = pokemon.types[0];
     pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;
     return pokemon;
  }
}
