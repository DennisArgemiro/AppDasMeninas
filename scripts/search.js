import { db, supabase, returnMedicines } from "../scripts/database.js";

var inputSearch = document.querySelector("#searchBar");
var btn = document.querySelector("#searchBtn");
const resultados = document.querySelector(".item-results");

btn.addEventListener("click", async function () {
  var cacheInput = inputSearch.value.toLowerCase().split("");
  console.log(cacheInput);
  
  const { data, error } = await supabase.from("lembreme").select();
  resultados.innerHTML = ""
  
  for (var i = 0; i < data.length; i++) {
    console.log("entrei no ForI")
    
    var cacheDb = data[i].nomeVenda.toLowerCase().split("");
    
    for (var j = 0; j < cacheInput.length; j++) {
      var teste = false;
      console.log("entrei no ForJ")
      
      console.log(cacheDb[j],cacheInput[j])
      if (cacheDb[j] !== cacheInput[j]) {
        teste = true;
        console.log("entrei no IF-J")
        break;
      }
    }
    if(teste === false){
      console.log("entrei no if")
      const button = document.createElement("button");
      button.className = "medicine";
      button.setAttribute("id", `btn-${i}`);
      button.value = data[i].nomeVenda;
      const img = document.createElement("img");
    img.setAttribute("src", "../assets/user_image.png");

    const div = document.createElement("div");
    div.className = "data-main";

    const h1 = document.createElement("h1");
    h1.textContent = data[i].nomeVenda;

    const h5 = document.createElement("h5");
    h5.textContent = data[i].nomeOriginal;

    /////////////////////////
    div.appendChild(h1);
    div.appendChild(h5);
    button.appendChild(img);
    button.appendChild(div);

    resultados.appendChild(button);
    button.addEventListener("click", () => {
      window.localStorage.setItem("key", button.value);
      window.location.href = "../pages/description.html";
    });

  }
    }
    

  cacheInput = inputSearch.value.toLowerCase().split("");
});
