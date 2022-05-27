// Add rotinas sem o remédio ainda
class Routine{
    constructor(nomeRotina, descRotina){
        this.nomeRotina = nomeRotina;
        this.descRotina = descRotina;
    }
}
const btn = document.querySelector("#botao");
const nome = document.querySelector("#inputName");
const desc = document.querySelector("#inputDesc");

btn.addEventListener("click", function (){


    const rout = new Routine(nome.value, desc.value)

    if(nome.value === "" || desc.value === ""){
        return alert("Escreva o nome da rotina e a descrição para continuarmos")
    }

    insertRoutine(nome.value, desc.value);  
    window.location.href = "/pages/search.html"  
})

//banco de dados
var db = openDatabase("dbApp", '1.0', "LocalDB",4*1024*1024);
db.transaction(function(tx){
    tx.executeSql("CREATE TABLE medicines (id INTEGER PRIMARY KEY, nome TEXT, desc TEXT)")
})

db.transaction(function(tx){
    tx.executeSql("CREATE TABLE routines (id INTEGER PRIMARY KEY, nome TEXT, desc TEXT)")
})
function insertRoutine(nomeInput,descInput){
db.transaction(function(tx){
    tx.executeSql("INSERT INTO routines (nome, desc) VALUES(?,?)", [nomeInput,descInput])
})}
