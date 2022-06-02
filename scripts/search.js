import { db } from "./database.js";
import { list } from "./database.js";

var inputSearch = document.querySelector("#searchBar");
var btn = document.querySelector("#searchBtn");

inputSearch.addEventListener("change", function () {
  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM medicines",
      [],
      function (tx, result) {
        var rows = result.rows;
        var div = "";
        var search = document.querySelector(".item-results");

        for (var i = 0; i < rows.length; i++) {
          var cahceRow = rows[i].nome.toLowerCase();
          var splited = cahceRow.split("");
          var cahceInput = inputSearch.value.toLowerCase();

          var notequal = false;

          for (var j = 0; j < splited.length; j++) {
            if (inputSearch.value !== "") {
              var splitInput = cahceInput.split("");
              if (splitInput[j] !== splited[j]) {
                notequal = true;
              }
              break;
            }
          }
          if (!notequal) {
            div += list[i];
          }
        }
        search.innerHTML = div;
      },
      null
    );
  });
});

export function getValueOfMedicines() {
  console.log("started the process");
  window.setTimeout(async () => {
    const medID = document.querySelectorAll(".medicine");
    console.log(medID.length);
    
    for (var i = 0 ; i < medID.length -1; i++) {
      medID[i].addEventListener("click", function () {
        // window.localStorage.setItem("key", "newBtn[0].value");
        // window.location.href = "../pages/description.html";
    console.log(medID[i].id);
    // console.log(newBtn[0].value);
    },2000);
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
