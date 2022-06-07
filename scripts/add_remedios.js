import * as db from "./database.js"

const nomeVenda = document.querySelector("#inputNomeVenda");
const nomeOriginal = document.querySelector("#inputNomeOriginal");
const desc = document.querySelector("#inputDesc");
const btn = document.querySelector("#submitBtn");

btn.addEventListener("click", function(e){
    e.preventDefault();

    var confirmar = confirm("Todos os Valores estão corretos?")

    if(confirmar){
        db.insertMedicines(nomeVenda.value, nomeOriginal.value, desc.value)
    }

    nomeVenda.value = ""
    nomeOriginal.value = ""
    desc.value = ""

})
