import { PokemonController } from "./controller/pokemonController.js";

const buttonLoadMore = document.querySelector("#LoadMore");
const pokemonController = new PokemonController("#pokemonList",'#moreDetails');

pokemonController.createFirstView();

buttonLoadMore.addEventListener("click", () => {
  pokemonController.updadeView();
  if (pokemonController.requestLimitReached) {
    buttonLoadMore.parentElement.removeChild(buttonLoadMore);
  }
});
