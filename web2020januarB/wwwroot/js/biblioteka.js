import { Polica } from "./polica.js";

export class Biblioteka {
  /**
   *
   * @param {number} id
   * @param {string} ime
   * @param {Polica[]} police
   */
  constructor(id, ime, police) {
    this.id = id;
    this.ime = ime;
    this.police = police;
  }

  /**
   *
   * @param {HTMLElement} host
   */
  prikazi(host) {
    const divContainer = document.createElement("div");
    host.appendChild(divContainer);

    const divTop = document.createElement("div");
    divTop.classList.add("divTop");
    divContainer.appendChild(divTop);

    const divBottom = document.createElement("div");
    divBottom.classList.add("divBottom");
    divContainer.appendChild(divBottom);

    const divBottomLeft = document.createElement("div");
    divBottomLeft.classList.add("divBottomLeft");
    divBottom.appendChild(divBottomLeft);

    const divBottomRight = document.createElement("div");
    divBottomRight.classList.add("divBottomRight");
    divBottom.appendChild(divBottomRight);

    const kontrola = document.createElement("div");
    kontrola.classList.add("kontrola");
    divBottomLeft.appendChild(kontrola);

    const naslov = document.createElement("span");
    naslov.innerHTML = this.ime;
    divTop.appendChild(naslov);

    this.police.forEach(x=>{
        const r = document.createElement("input");
        r.type = "radio";
        r.name = this.ime;
        r.value = x.id;
        const span = document.createElement("span");
        span.innerHTML = x.name;
        const labela = document.createElement("label");
        labela.appendChild(r);
        labela.appendChild(span);
        kontrola.appendChild(labela);
        x.prikazi(divBottomRight);
    })

    const brKnjiga = document.createElement("span");
    brKnjiga.innerHTML = "Broj Knjiga:"
    divBottomLeft.appendChild(brKnjiga);

    const unos = document.createElement("input");
    unos.type = "number";
    divBottomLeft.appendChild(unos);

    const btn = document.createElement("button");
    btn.innerHTML = "Dodaj na policu";
    divBottomLeft.appendChild(btn);

    btn.onclick = (ev) =>  
    {
        const radio = document.querySelector(`input[name='${this.ime}']:checked`);
        //const radio = document.querySelector("input[name='" + this.ime + "']:checked");

        const id = radio.value;

        const form = new FormData();
        form.append("id", id);
        form.append("increment", unos.value);

        fetch("/api/biblioteka", { method: "post", body: form })
        .then((x) => x.json())
        .then((x) => {
          const polica = this.police.filter((polica) => polica.id == id).pop();
          polica.trenutnoKnjiga = x.trenutnoKnjiga; // polica je front x je back
          polica.crtajPolicu();
        });
    }
  }
}
