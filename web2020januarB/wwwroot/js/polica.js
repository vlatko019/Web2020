export class Polica {
  /**
   *
   * @param {number} id
   * @param {string} name
   * @param {number} trenutnoKnjiga
   * @param {number} maxKnjiga
   */
  constructor(id, name, trenutnoKnjiga, maxKnjiga) {
    this.id = id;
    this.name = name;
    this.trenutnoKnjiga = trenutnoKnjiga;
    this.maxKnjiga = maxKnjiga;
  }

  /**
   *
   * @param {HTMLElement} host
   */
  prikazi(host) {
    const divPolica = document.createElement("div");
    divPolica.classList.add("divPolica");
    host.appendChild(divPolica);

    const levo = document.createElement("div");
    levo.classList.add("levo");
    divPolica.appendChild(levo);

    this.sredina = document.createElement("div");
    this.sredina.classList.add("sredina");
    divPolica.appendChild(this.sredina);

    const desno = document.createElement("div");
    desno.classList.add("desno");
    divPolica.appendChild(desno);

    let labela = document.createElement("span");
    labela.innerHTML = this.name;
    levo.appendChild(labela);

    this.labela2 = document.createElement("span");
    desno.appendChild(this.labela2);
    
    this.crtajPolicu();

    // for (let i = 0; i < this.maxKnjiga; i++) {
    //   const knjigaDiv = document.createElement("div");
    //   knjigaDiv.classList.add("knjigaDiv");
    //   sredina.appendChild(knjigaDiv);
    //   if (i < this.trenutnoKnjiga) this.knjigaDiv.style.color = "green";
    //   this.knjigaDiv.style.flexGrow = 1;
    // }
  }

  crtajPolicu() {
    this.sredina.innerHTML = "";
    for (let i = 0; i < this.trenutnoKnjiga; i++) {
      const knjigaDiv = document.createElement("div");
      knjigaDiv.classList.add("knjigaDiv");
      this.sredina.appendChild(knjigaDiv);
      knjigaDiv.style.backgroundColor = "green";
      knjigaDiv.style.flexGrow = 1 / this.maxKnjiga;
    }

    this.labela2.innerHTML = this.trenutnoKnjiga + "/" + this.maxKnjiga;

  }
}
