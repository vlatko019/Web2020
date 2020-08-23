import { Silos } from "./Silos.js";
export class Fabrika {
  constructor(id = 0, naziv = "testo", silosi = []) {
    this.id = id;
    this.naziv = naziv;
    this.silosi = silosi;
  }

  prikazi(host) {
    const container = document.createElement("div");
    container.classList.add("container");
    host.appendChild(container);

    const levi = document.createElement("div");
    levi.classList.add("levi");
    container.appendChild(levi);

    const desni = document.createElement("div");
    desni.classList.add("desni");
    container.appendChild(desni);

    const levoGore = document.createElement("div");
    levoGore.classList.add("levoGore");
    levoGore.innerHTML = this.naziv;
    levi.appendChild(levoGore);

    const levoDole = document.createElement("div");
    levoDole.classList.add("levoDole");
    levi.appendChild(levoDole);

    const imeFabrike = document.createElement("span");
    levoGore.appendChild(imeFabrike);

    const div1 = document.createElement("div");
    div1.classList.add("kontrola");
    desni.appendChild(div1);

    const div2 = document.createElement("div");
    div2.classList.add("kontrola");
    desni.appendChild(div2);

    const labela1 = document.createElement("span");
    labela1.innerHTML = "Silos:";
    div1.appendChild(labela1);

    this.comboBox = document.createElement("select");
    div1.appendChild(this.comboBox);

    this.silosi.forEach((x) => {
      const div = document.createElement("div");
      div.classList.add("silosi");
      levoDole.appendChild(div);
      x.prikazi(div);

      const options = document.createElement("option");
      options.value = x.id;
      options.text = x.oznaka;

      this.comboBox.appendChild(options);
    });

    const labela2 = document.createElement("span");
    labela2.innerHTML = "Kolicina:";
    div2.appendChild(labela2);

    this.txtbox = document.createElement("input");
    div2.appendChild(this.txtbox);

    const btn = document.createElement("button");
    btn.innerHTML = "Sipaj u silos";
    desni.appendChild(btn);

    btn.onclick = () => {
      const form = new FormData();
      form.append("id", this.comboBox.value);
      form.append("inkrement", this.txtbox.value);
      fetch("/api/pekara", { method: "post", body: form })
        .then((x) => x.json())
        .then((x) => {
          const silos = this.silosi.filter((silos) => silos.id == this.comboBox.value).pop();
          silos.trenKolicina = x.trenKolicina;
          silos.render();
        });
    };
  }
}
