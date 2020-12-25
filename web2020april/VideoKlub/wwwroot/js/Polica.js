export class Polica {
  constructor(id, oznaka = "test", maxDVD = 0, trenutnoDVD = 0) {
    this.id = id;
    this.oznaka = oznaka;
    this.maxDVD = maxDVD;
    this.trenutnoDVD = trenutnoDVD;
  }

  nacrtajPolicu(host) {
    const divCeo = document.createElement("div");
    divCeo.classList.add("divCeoClass");
    host.appendChild(divCeo);

    const divLeft = document.createElement("div");
    divLeft.classList.add("divLeftClass");
    divCeo.appendChild(divLeft);

    const labela = document.createElement("span");
    labela.innerHTML = this.oznaka;
    divLeft.appendChild(labela);

    this.divMid = document.createElement("div");
    this.divMid.classList.add("divMidClass");
    divCeo.appendChild(this.divMid);

    for (let i = 0; i < this.maxDVD; i++) {
      const disk = document.createElement("div");
      disk.classList.add("disk");
      if (i < this.trenutnoDVD) {
        disk.classList.add("imaDisk");
      }
      this.divMid.appendChild(disk);
    }

    const divRight = document.createElement("div");
    divRight.classList.add("divRightClass");
    divCeo.appendChild(divRight);

    this.brojDvd = document.createElement("span");
    this.brojDvd.innerHTML = this.trenutnoDVD + "/" + this.maxDVD;
    divRight.appendChild(this.brojDvd);
  }

  update() {
    this.brojDvd.innerHTML = this.trenutnoDVD + "/" + this.maxDVD;

    this.divMid.innerHTML = "";
    for (let i = 0; i < this.maxDVD; i++) {
      const disk = document.createElement("div");
      disk.classList.add("disk");
      if (i < this.trenutnoDVD) {
        disk.classList.add("imaDisk");
      }
      this.divMid.appendChild(disk);
    }
  }
}
