import { db } from "./database.js";

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
          var cahceRow = rows[i].nome.toLowerCase()
          var splited = cahceRow.split('');
          var cahceInput = inputSearch.value.toLowerCase()
          
          var notequal = false;
          
          for (var j = 0; j < splited.length; j++) {
            if(inputSearch.value !== ''){
              var splitInput = cahceInput.split('');
              if (splitInput[j] !== splited[j]) {
                notequal = true;
              }
              break
            }
          }
          if (notequal === false) {
            div += "<div class='medicine'>";
            div += '<img src="/assets/user_image.png" />';
            div += '<div class="data-main">';
            div += "<h1>" + rows[i].nome + "</h1>";
            div += "<h5>" + rows[i].desc + "</h5>";
            div += "</div>";
            div += "</div>";
            notequal = false;
          }
          
        }
        search.innerHTML = div;
      },
      null
    );
  });
});
