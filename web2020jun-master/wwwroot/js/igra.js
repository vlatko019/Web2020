import { Igrac } from "./igrac.js";

export class Igra {
  constructor(id, igrac1, igrac2, lokacija, vreme,poeni11,poeni12,poeni21,poeni22, poeni1 = 0, poeni2 = 0, rezultat1 = 0, rezultat2 = 0) {
    this.id = id;
    this.poeni1 = poeni1;
    this.igrac1 = igrac1;
    this.poeni2 = poeni2;
    this.igrac2 = igrac2;
    this.lokacija = lokacija;
    this.vreme = vreme;
    this.rezultat1 = rezultat1;
    this.rezultat2 = rezultat2;

    this.poeni11 = poeni11;
    this.poeni12 = poeni12;
    this.poeni21 = poeni21;
    this.poeni22 = poeni22;

    this.recalculate();
  }

  prikazi(body) {
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("containerDivClass");
    body.appendChild(containerDiv);

    const gornjiDiv = document.createElement("div");
    gornjiDiv.classList.add("gornjiDivClass");
    containerDiv.appendChild(gornjiDiv);

    let lokacijaSpan = document.createElement("span");
    lokacijaSpan.innerHTML = "Lokacija: " + this.lokacija;
    gornjiDiv.appendChild(lokacijaSpan);

    let vremeSpan = document.createElement("span");
    vremeSpan.innerHTML = this.vreme;
    gornjiDiv.appendChild(vremeSpan);

    const donjiDiv = document.createElement("div");
    donjiDiv.classList.add("donjiDivClass");
    containerDiv.appendChild(donjiDiv);

    const prviIgracDiv = document.createElement("div");
    prviIgracDiv.classList.add("prviIgracDivClass");
    donjiDiv.appendChild(prviIgracDiv);
    this.igrac1.prikazi(prviIgracDiv);

    const rezultatDiv = document.createElement("div");
    rezultatDiv.classList.add("rezultatDivClass");
    donjiDiv.appendChild(rezultatDiv);

    let rezultatText = document.createElement("span");
    rezultatText.innerHTML = "Rezultat";
    rezultatDiv.appendChild(rezultatText);

    this.rezultatSpan = document.createElement("span");
    this.rezultatSpan.innerHTML = `${this.rezultat1} - ${this.rezultat2}`;
    rezultatDiv.appendChild(this.rezultatSpan);

    this.poeniRundaSpan = document.createElement("span");
    rezultatDiv.appendChild(this.poeniRundaSpan);

    let poeniText = document.createElement("span");
    poeniText.innerHTML = "Poeni";
    rezultatDiv.appendChild(poeniText);

    this.poeniSpan = document.createElement("span");
    this.poeniSpan.innerHTML = `${this.poeni1} - ${this.poeni2}`;
    rezultatDiv.appendChild(this.poeniSpan);

    let kontrole = document.createElement("div");
    kontrole.classList.add("kontrole");

    this.prviIgracKontrola = document.createElement("button");
    kontrole.appendChild(this.prviIgracKontrola);
    this.drugiIgracKontrola = document.createElement("button");
    kontrole.appendChild(this.drugiIgracKontrola);
    this.prviIgracKontrola.innerHTML = this.drugiIgracKontrola.innerHTML = "+";
    this.prviIgracKontrola.onclick = () => {
      this.dodajPoen(this.igrac1);
    };
    this.drugiIgracKontrola.onclick = () => {
      this.dodajPoen(this.igrac2);
    };

    rezultatDiv.appendChild(kontrole);

    const drugiIgracDiv = document.createElement("div");
    drugiIgracDiv.classList.add("drugiIgracDivClass");
    donjiDiv.appendChild(drugiIgracDiv);
    this.igrac2.prikazi(drugiIgracDiv);

    this.redraw();
  }
  /**
   *
   * @param {Igrac} igrac
   */
  dodajPoen(igrac) {

    const form = new FormData();
    form.append("id", this.id);
    form.append("idIgraca", igrac.id);

    fetch("/api/tenis/update", {
      method: "post",
      body: form,
    })
      .then((x) => x.json())
      .then((x) => {
        this.poeni11 = x.rezultat11;
        this.poeni12 = x.rezultat12;
        this.poeni21 = x.rezultat21;
        this.poeni22 = x.rezultat22;

this.recalculate();

        this.redraw();
      });

    //this.redraw();
  }

  recalculate(){
    this.rezultat1 = 0;
    this.rezultat2 = 0;

    if (this.poeni11 == 6) {
      this.rezultat1++;
    }
    
    if (this.poeni12 == 6) {
      this.rezultat1++;
    }

    if (this.poeni21 == 6) {
      this.rezultat2++;
    }

    if (this.poeni22 == 6) {
      this.rezultat2++;
    }

    if(this.poeni11==6 || this.poeni21 == 6){
      this.poeni1 = this.poeni12;
      this.poeni2 = this.poeni22;
    } else {
      this.poeni1 = this.poeni11;
      this.poeni2 = this.poeni21;
    }

  }

  redraw() {
    if (this.rezultat1 + this.rezultat2 == 2) {
      this.prviIgracKontrola.disabled = true;
      this.drugiIgracKontrola.disabled = true;
      this.poeni1 = "-";
      this.poeni2 = "-";

      this.poeniRundaSpan.innerHTML = `(${this.poeni11} - ${this.poeni21}), (${this.poeni12} - ${this.poeni22})`;
    }
    this.poeniSpan.innerHTML = `${this.poeni1} - ${this.poeni2}`;
    this.rezultatSpan.innerHTML = `${this.rezultat1} - ${this.rezultat2}`;
  }
}
