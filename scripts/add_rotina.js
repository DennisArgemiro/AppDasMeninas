import * as database from "./database.js"

const btn = document.querySelector("#botao");
const nome = document.querySelector("#inputName");
const desc = document.querySelector("#inputDesc");

btn.addEventListener("click", function () {
  if (nome.value === "" || desc.value === "") {
    return alert("Escreva o nome da rotina e a descrição para continuarmos");
  }
  database.insertRoutine(nome.value, desc.value);
  window.localStorage.setItem('nomeRot', nome.value)
  window.location.href = "/pages/search.html";
});

