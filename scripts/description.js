import { db,createRoutine, supabase} from "./database.js";



const nomeRemedio = localStorage.getItem('key')

const nomeHeader = document.querySelector("#nomeMed");
const nomeDesc = document.querySelector(".nomeMed");
const addBtn = document.querySelector("#addBtn");
const description = document.querySelector("#description")
var p = ''

nomeHeader.textContent = nomeRemedio
nomeDesc.textContent = nomeRemedio

const {data,error} = await supabase.from('lembreme').select(
    'desc'
    ).eq('nomeVenda',nomeRemedio)
    
    
    p += "<p>"+data[0].desc+"</p>"
    description.innerHTML = p
    


addBtn.addEventListener('click', function(){
    createRoutine(localStorage.getItem('nomeRot'),localStorage.getItem('key'))
    var conf = confirm('Adicionar mais um remédios?')
    if(!conf){
        window.location.href = '../index.html'
    }else{
        window.location.href = '../pages/search.html'
        
    }

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