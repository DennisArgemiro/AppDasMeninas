import { db,createRoutine} from "./database.js";

const nomeRemedio = localStorage.getItem('key')

const nomeHeader = document.querySelector("#nomeMed");
const nomeDesc = document.querySelector(".nomeMed");
const addBtn = document.querySelector("#addBtn");

nomeHeader.textContent = nomeRemedio
nomeDesc.textContent = nomeRemedio
db.transaction(function(tx){
    tx.executeSql(`SELECT * FROM medicines WHERE nome = "${nomeRemedio}"` ,[], function(tx, res){
        const bufferMed = res.rows[0]
        const desc = document.querySelector("#description")

        var p = ""
        p +="<p>"+bufferMed.desc+"</p>"
        desc.innerHTML = p
  
    })
})

addBtn.addEventListener('click', function(){
    createRoutine(localStorage.getItem('nomeRot'),localStorage.getItem('key'))
    window.location.href = '../index.html'

})
const nomeRotina = document.querySelector("#nameRot");

nomeRotina.textContent = localStorage.getItem('RotKey')

const infoBtn = document.querySelector("#infoBtn")


infoBtn.addEventListener("click", ()=>{
    db.transaction(function(tx){
        tx.executeSql(`SELECT * FROM routines WHERE nome = '${localStorage.getItem('RotKey')}'`,[],function(tx, result){
            const rows = result.rows
            alert(rows[0].desc)
            setMedOnRotine(result)
        }, null)
})
})