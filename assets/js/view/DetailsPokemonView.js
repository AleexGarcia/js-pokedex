export class DetailsPokemonView {
  DetailsPokemonView;

  constructor(DetailsPokemonView) {
    this.DetailsPokemonView = DetailsPokemonView;
  }

  template(pokemon) {
    return `
    <div class="details__container ${pokemon.principalType}">
    <div class="details__top">
      <div class="details__controls">
        <button id="DetailsButtonClose">Voltar</button>
      </div>
      <div class="details__header">
        <h2>${pokemon.name}</h2>
        <ul>
        ${pokemon.types
          ?.map(
            (type) => `
          <li class="${pokemon.principalType}">${type}</li>
          `
          )
          .join("")}
        </ul>
        <span>#${pokemon.id}</span>
      </div>
      <img src="${pokemon.photo}" alt="${pokemon.name}">
 
    </div>
    <div class="details__bottom">
      <ul class="details__navigation" id="DetailsNavigation">
        <li data-ref="about" class="${pokemon.principalType}-color">About</li>
        <li data-ref="stats" class="${pokemon.principalType}-color">Base Stats</li>
        <li data-ref="moves" class="${pokemon.principalType}-color">Moves</li>
      </ul>
      <div class="details__content" id="DetailsContent">
            <div class="about" data-state="open">
                <table>
                <tbody>
                <tr>
                <td class="info">
                Height
                </td>
                <td>${pokemon.height}</td>
                </tr>
                <tr>
                <td class="info">Weight</td>
                <td>${pokemon.weight}</td>
                </tr>
                <tr>
                <td class="info">Abilities</td>
                <td>${pokemon.abilities.join(", ")}</td>
                </tr>
                </tbody>
                </table>
                </div>
                <div class="stats" data-state="close">
                <table>
            ${pokemon.baseStatus
              ?.map(
                (stat) =>
                  `
                <tr>
                <td  class="info">
                    ${stat.name}
                </td>
                <td>
                    ${stat.value}
                </td>
            </tr>
                `
              )
              .join("")}
            
        </table>
            </div>
            <div class="moves" data-state="close">
                <ul>
                ${pokemon.moves
                  ?.map(
                    (move) => `
                    <li>${move}</li>
                    `
                  )
                  .join("")}
                </ul>
            </div>
      </div>
    </div>
  </div> `;
  }

  view(pokemon) {
    this.DetailsPokemonView.innerHTML = this.template(pokemon);
  }
}
