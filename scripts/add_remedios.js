import * as db from "./database.js"

const nome = document.querySelector("#inputNome");
const desc = document.querySelector("#inputDesc");
const btn = document.querySelector("#submitBtn");

btn.addEventListener("click", function(e){
    e.preventDefault();

    var confirmar = confirm("Todos os Valores estão corretos?")

    if(confirmar){
        db.insertMedicines(nome.value, desc.value)
    }

    nome.value = ""
    desc.value = ""

})
