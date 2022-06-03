import { db, returnMedicines } from "../scripts/database.js";

var inputSearch = document.querySelector("#searchBar");
var btn = document.querySelector("#searchBtn");

btn.addEventListener("click", function () {
  console.log("clicado")
  var cacheInput = inputSearch.value;
  db.transaction(function (tx) {
    tx.executeSql(
      `SELECT * FROM medicines WHERE nome LIKE '%${cacheInput}%'`,
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
          
        }, 1000);
      },

      null
    );
  });
});

export function getValueOfMedicines() {
  console.log("started the process");
  window.setTimeout(async () => {
    const medID = document.querySelectorAll(".medicine");
    for (var i = 0; i < medID.length - 1; i++) {
      medID[i].addEventListener(
        "click",
        function () {
          // window.localStorage.setItem("key", "newBtn[0].value");
          // window.location.href = "../pages/description.html";
          // console.log(newBtn[0].value);
          // console.log(medID[i].id);
        },
        2000
      );
    }

    console.log("finished! total medicines are: " + medID.length);
  }, 2000);
}

const botao = document.querySelector("#searchBtn");

botao.addEventListener("click", () => {
  window.setTimeout(() => {
    getValueOfMedicines();
  });
});
