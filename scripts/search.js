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
            div += "<button class='medicine' id='btn"+i+"' value='"+rows[i].nome+"'>";
            div += '<img src="/assets/user_image.png"/>';
            div += '<div class="data-main">';
            div += "<h1>" + rows[i].nome + "</h1>";
            div += "<h5>" + rows[i].desc + "</h5>";
            div += "</div>";
            div += "</button>";
            notequal = false;
          }
          
        }
        search.innerHTML = div;
      },
      null
    );
  });
});


export function getValueOfMedicines(){
  console.log("started the process")
  window.setTimeout(async ()=>{
    
    const medID = await document.querySelectorAll(".medicine") 
    
    const listBtn = []

    for(var i = 0; i<medID.length; i++){
      const newBtn = document.querySelector("#btn"+i+"")
      listBtn.push(newBtn)

    }
    for (const key in listBtn) {

      listBtn[key].addEventListener("click", function(){
        window.localStorage.setItem('key',listBtn[key].value)
        window.location.href = "../pages/description.html"
      })
        
    }

    console.log("finished! total medicines are: "+medID.length)
  }, 2000)
}