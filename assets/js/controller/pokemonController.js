import { PokemonReposity } from "../repository/PokemonReposity.js";
import { PokemonService } from "../service/PokemonService.js";
import { PokemonView } from "../view/pokemonView.js";
import {DetailsPokemonView } from "../view/DetailsPokemonView.js"

export class PokemonController {
  elementPokemonList;
  elementPokemonDetails;
  pokemonView;
  pokemonService = new PokemonService();
  pokemonReposity = new PokemonReposity();
  detailsPokemonView;
  offset = 0;
  limit = 5;
  maxRecords = 13;
  requestLimitReached = false;

  constructor(listSelector, moreDetailsSelector) {
    const listElement = document.querySelector(listSelector);
    const moreDetailsElement = document.querySelector(moreDetailsSelector);
    if (listElement && moreDetailsElement) {
      this.elementPokemonList = listElement;
      this.elementPokemonDetails = moreDetailsElement;
      this.pokemonView = new PokemonView(this.elementPokemonList);
      this.detailsPokemonView = new DetailsPokemonView(this.elementPokemonDetails);
    } else {
      throw Error(`Seletor ${selector} não existe no DOM`);
    }
  }

  getPokemons = async () => {
    const URL_BASE = "https://pokeapi.co/api/v2/";

    try {
      let limit = this.checkLimitForNextPage();
      console.log("offset", this.offset, "limit", this.limit);
      const response = await fetch(
        `${URL_BASE}pokemon?offset=${this.offset}&limit=${limit}`
      );
      console.log(`${URL_BASE}pokemon?offset=${this.offset}&limit=${limit}`);
      const data = await response.json();
      const pokemonList = data.results;
      const pokemonDetailsPromisesList = await pokemonList.map((pokemon) =>
        this.getPokemonDetail(pokemon)
      );
      const pokemonsDetailsList = await Promise.all(pokemonDetailsPromisesList);
      this.offset += this.limit;
      this.pokemonReposity.addPokemonsList(pokemonsDetailsList);
      return pokemonsDetailsList;
    } catch (error) {
      console.log(error);
    }
  };

  getPokemonDetail = async (pokemon) => {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    return this.pokemonService.convertPokemonApiToPokemon(data);
  };

  async createFirstView() {
    this.pokemonView.view(await this.getPokemons());
    this.addEventListenerPokemonCard();
  }

  async updadeView() {
    if (!this.requestLimitReached) {
      this.pokemonView.updateView(await this.getPokemons());
      this.addEventListenerPokemonCard();
    }
  }

  checkLimitForNextPage() {
    if (
      this.offset + this.limit >= this.maxRecords &&
      !this.requestLimitReached
    ) {
      this.limit = this.maxRecords - this.offset;
      this.requestLimitReached = true;
    }
    return this.limit;
  }

  addEventListenerPokemonCard() {
    for (const li of this.elementPokemonList.children) {
      li.addEventListener("click", () => {
        const id = parseInt(li.dataset.id);
        this.openPokemonMoreDetails(id);
      });
    }
  }

  openPokemonMoreDetails(id){
    this.elementPokemonDetails.dataset.state = 'open';
    const pokemon = this.pokemonReposity.getPokemon(id);
    this.detailsPokemonView.view(pokemon);
  }

  closePokemonMoreDetails(){
    this.elementPokemonDetails.dataset.state = 'close';
  }
}
