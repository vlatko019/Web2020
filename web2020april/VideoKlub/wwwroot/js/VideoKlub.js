import { Polica } from "./Polica.js";

export class VideoKlub {
  constructor(id, naziv = "default", listaPolica = []) {
    this.id = id;
    this.naziv = naziv;
    this.listaPolica = listaPolica;
  }

  changeName(name) {
    this.naziv = name;
  }

  addPolica(polica) {
    this.listaPolica.push(polica);
  }

  prikazi(host) {
    const divContainer = document.createElement("div");
    divContainer.classList.add("divContainerClass");
    host.appendChild(divContainer);

    const divGore = document.createElement("div");
    divGore.classList.add("divGoreClass");
    divContainer.appendChild(divGore);

    const klubIme = document.createElement("span");
    klubIme.innerHTML = `Video klub "${this.naziv}"`;
    divGore.appendChild(klubIme);

    const divDole = document.createElement("div");
    divDole.classList.add("divDoleClass");
    divContainer.appendChild(divDole);

    const divDoleLevo = document.createElement("div");
    divDoleLevo.classList.add("divDoleLevoClass");
    divDole.appendChild(divDoleLevo);

    const divDoleDesno = document.createElement("div");
    divDoleDesno.classList.add("divDoleDesnoClass");
    divDole.appendChild(divDoleDesno);

    const oznake = document.createElement("div");
    oznake.classList.add("oznakeClass");
    this.listaPolica.forEach((element) => {
      this.divRadio = document.createElement("div");
      this.divRadio.classList.add("divradioClass");
      oznake.appendChild(this.divRadio);

      const rb = document.createElement("input");
      rb.type = "radio";
      rb.name = "tip" + this.id;
      rb.value = element.id;
      this.divRadio.appendChild(rb);

      const rbt = document.createElement("span");
      rbt.innerHTML = element.oznaka;
      this.divRadio.appendChild(rbt);

      element.nacrtajPolicu(divDoleDesno);
    });
    divDoleLevo.appendChild(oznake);

    const ostalo = document.createElement("div");
    ostalo.classList.add("ostaloClass");
    divDoleLevo.appendChild(ostalo);

    const brojDVD = document.createElement("span");
    brojDVD.innerHTML = "Broj DVD-ova";
    ostalo.appendChild(brojDVD);

    const txtbox = document.createElement("input");
    txtbox.classList.add("textboxDesno");
    ostalo.appendChild(txtbox);

    const btnAdd = document.createElement("button");
    btnAdd.innerHTML = "Dodaj na policu";
    btnAdd.onclick = () => {
      const inc = txtbox.value;
      const checked = document.querySelector(`[name=tip${this.id}]:checked`);
      const polica = this.listaPolica
        .filter((polica) => polica.id == checked.value)
        .pop();

      const d = new FormData();
      d.append("id", polica.id);
      d.append("inc", inc);

      fetch("/VideoKlub", {
        method: "POST",
        body: d,
      })
        .then((x) => x.json())
        .then((x) => {
          polica.trenutnoDVD = x.trenutnoDVD;
          polica.update();
        });
    };
    ostalo.appendChild(btnAdd);
  }
}
