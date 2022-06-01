import { db } from "./database.js";

const nomeRemedio = localStorage.getItem('key')

const nome = document.querySelector("#nomeMed")

nome.innerHTML = nomeRemedio
db.transaction(function(tx){
    tx.executeSql(`SELECT * FROM medicines WHERE nome = "${nomeRemedio}"` ,[], function(tx, res){
        const row = res.rows
        const bufferMed = res.rows[0]
        const desc = document.querySelector("#description")

        var p = ""

        console.log(bufferMed.desc)

        p +="<p>"+bufferMed.desc+"</p>"
        desc.innerHTML = p

        localStorage.clear()    
    })
})