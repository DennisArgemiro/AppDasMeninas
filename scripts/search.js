import { db, returnMedicines } from "../scripts/database.js";

var inputSearch = document.querySelector("#searchBar");
var btn = document.querySelector("#searchBtn");

btn.addEventListener("click", function () {
  console.log("clicado")
  var cacheInput = inputSearch.value;
  db.transaction(function (tx) {
    tx.executeSql(
      `SELECT * FROM medicines WHERE nomeVenda LIKE '%${cacheInput}%'`,
      [],
      (tx, result) => {
       cacheInput = inputSearch.value.toLowerCase().split("");
        window.setTimeout(() => {
          var test = false;
            if (test === false) {
              const results = document.querySelector(".item-results");
              results.innerHTML = "";
              returnMedicines(result)
            }
          /////////////////////////////
        }, 1000);
      },

      null
    );
  });
});


const botao = document.querySelector("#searchBtn");

botao.addEventListener("click", () => {
  window.setTimeout(() => {
    getValueOfMedicines();
  });
});
