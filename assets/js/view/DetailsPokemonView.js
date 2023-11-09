export class DetailsPokemonView {
  DetailsPokemonView;

  constructor(DetailsPokemonView) {
    this.DetailsPokemonView = DetailsPokemonView;
  }

  template(pokemon) {
    return `
            <div>
         
            </div>
        `;
  }

  view(pokemon) {
    this.DetailsPokemonView.innerHTML = this.template(pokemon);
  }
}
