// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.

import { Polica } from "./Polica.js";
import { VideoKlub } from "./VideoKlub.js";

function main() {
  fetch("/VideoKlub")
    .then((x) => x.json())
    .then((x) => {
      x.forEach((klub) => {
        const vk = new VideoKlub(
          klub.id,
          klub.name,
          klub.police.map((polica) => {
            return new Polica(
              polica.id,
              polica.name,
              polica.maxDVD,
              polica.trenutnoDVD
            );
          })
        );
        vk.prikazi(document.querySelector("body"));
      });
    });
}

main();
