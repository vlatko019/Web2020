import { Igra } from "./igra.js";
import { Igrac } from "./igrac.js";

fetch("/api/tenis/svi")
  .then((x) => x.json())
  .then((x) => {
    x.forEach((mec) => {
      const igrac1 = new Igrac(mec.igrac1.id, mec.igrac1.ime, mec.igrac1.godine, mec.igrac1.rang, mec.igrac1.slika);
      const igrac2 = new Igrac(mec.igrac2.id, mec.igrac2.ime, mec.igrac2.godine, mec.igrac2.rang, mec.igrac2.slika);

      let igra = new Igra(
        mec.id,
        igrac1,
        igrac2,
        mec.lokacija,
        new Date(mec.vreme).toString(),
        mec.rezultat11,
        mec.rezultat12,
        mec.rezultat21,
        mec.rezultat22
      );
      igra.prikazi(document.body);
    });
  });

// let p1 = new Igrac("Novak Djokovic", 33, 1, "https://www.gstatic.com/tv/thumb/persons/633923/633923_v9_ba.jpg");
// let p2 = new Igrac("Rafael Nadal", 35, 2, "https://www.tennisworldusa.org/imgb/93582/rafael-nadal-i-had-injuries-but-i-never-lost-motivation-.jpg");
// let i1 = new Igra(p1, p2, "Zajecar, Serbia", new Date().toString());

// i1.prikazi(document.body);
