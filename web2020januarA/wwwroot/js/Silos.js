export class Silos {
  constructor(id, oznaka, kapacitet, trenKolicina) {
    this.id = id;
    this.oznaka = oznaka;
    this.kapacitet = kapacitet;
    this.trenKolicina = trenKolicina;
  }

  prikazi(host) {
    const container = document.createElement("div");
    host.appendChild(container);

    const ime = document.createElement("div");
    ime.innerHTML = this.oznaka;
    container.appendChild(ime);

    this.zapremina = document.createElement("div");
    container.appendChild(this.zapremina);

    const slika = document.createElement("div");
    slika.className ="slika";
    container.appendChild(slika);
    this.grafika = document.createElement("div");
    this.grafika.classList.add("silos")
    this.render();
    slika.appendChild(this.grafika);
  }

  render() {
    this.grafika.style.flexGrow = this.trenKolicina / this.kapacitet;
    this.zapremina.innerHTML = `${this.trenKolicina}T/${this.kapacitet}T`;
  }
}
