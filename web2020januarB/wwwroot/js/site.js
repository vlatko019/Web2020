// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

import { Biblioteka } from "./biblioteka.js";
import { Polica } from "./polica.js";

// Write your JavaScript code.

fetch("/api/biblioteka")
  .then((x) => x.json())
  .then(parse);


//  async function asd(){

// const res = await fetch("/api/biblioteka");
// console.log(res);
// const res2 = await res.text();
// console.log(res2);
// }

//asd();

function parse(biblioteke) {

  biblioteke.forEach((element) => {
    const police = element.police.map((polica) => new Polica(polica.id, polica.name, polica.trenutnoKnjiga, polica.maxKnjiga));
    const biblioteka = new Biblioteka(element.id, element.ime, police);
    biblioteka.prikazi(document.body);
  });
}
