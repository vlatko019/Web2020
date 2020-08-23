export class Igrac {
    constructor(id,ime, godine, rang, url, score = 0) {
        this.id = id;
        this.ime = ime;
        this.godine = godine;
        this.rang = rang;
        this.image = url;
        this.score = score;
    }

    prikazi(body) {
        const igracDiv = document.createElement("div");  
        igracDiv.classList.add("igracDivClass");
        body.appendChild(igracDiv);

        let slikaContainer = document.createElement("div");
        igracDiv.appendChild(slikaContainer);
        slikaContainer.classList.add("slika-container")

        let slika = document.createElement("img");
        slika.src = this.image;
        slika.classList.add("slika")
        slikaContainer.appendChild(slika);

        let imeIgraca = document.createElement("span");
        imeIgraca.innerHTML = "Ime: " + this.ime;
        igracDiv.appendChild(imeIgraca);

        let godineIgraca = document.createElement("span");
        godineIgraca.innerHTML = "Godine: " + this.godine;
        igracDiv.appendChild(godineIgraca);

        let rangIgraca = document.createElement("span");
        rangIgraca.innerHTML = "ATP pozicija: " + this.rang;
        igracDiv.appendChild(rangIgraca);
    }
}