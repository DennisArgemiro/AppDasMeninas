class Routine{
    constructor(nomeRotina, descRotina){
        this.nomeRotina = nomeRotina;
        this.descRotina = descRotina;
    }
}
const btn = document.querySelector("#botao");
const nome = document.querySelector("#inputName");
const desc = document.querySelector("#inputDesc");


export var list = []

btn.addEventListener("click", function (e){
    e.preventDefault();

    const nomeValor = nome.value;
    const descValor = desc.value;

    const rout = new Routine(nomeValor, descValor)

    if(nomeValor === "" || descValor === ""){
        return alert("Escreva o nome da rotina e a descrição para continuarmos")
    }

    list.push(rout)
    console.log(list)
})


