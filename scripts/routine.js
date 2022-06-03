import {db} from "../scripts/database.js"

const nomeRotina = document.querySelector("#nameRot");

nomeRotina.textContent = localStorage.getItem('RotKey')

const infoBtn = document.querySelector("#infoBtn")


infoBtn.addEventListener("click", ()=>{
    db.transaction(function(tx){
        tx.executeSql(`SELECT * FROM routines WHERE nome = '${localStorage.getItem('RotKey')}'`,[],function(tx, result){
            const rows = result.rows
            alert(rows[0].desc)
        }, null)
})
})