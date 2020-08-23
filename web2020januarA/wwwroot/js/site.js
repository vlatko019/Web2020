// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

import { Fabrika } from "./Fabrika.js";
import { Silos } from "./Silos.js";

// Write your JavaScript code.

fetch("/api/pekara")
  .then((x) => x.json())
  .then((x) => {
    x.forEach((element) => {
      const silosi = element.silosi.map((x) => new Silos(x.id, x.oznaka, x.kapacitet, x.trenKolicina));
      const fabrika = new Fabrika(element.id, element.naziv, silosi);
      fabrika.prikazi(document.body);
    });
  });
