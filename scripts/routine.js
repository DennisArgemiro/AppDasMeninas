import { db } from "../scripts/database.js";

const nameHeader = document.querySelector("#nameRot");
const btn = document.querySelector("#infoBtn");
const pending = document.querySelector(".pending");
const done = document.querySelector(".done");

nameHeader.textContent = localStorage.getItem("RotKey");

db.transaction(function (tx) {
  tx.executeSql(
    `SELECT * FROM '${localStorage.getItem("RotKey")}'`,
    [],
    function (tx, result) {
      window.setTimeout(() => {
        const rows = result.rows;
        console.log(rows);
        btn.addEventListener("click", () => {
          const desc = alert("Muito legal esse Botão");
        });

        for (var i = 0; i < rows.length; i++) {
          console.log(rows[i].nome_remedio);

          const divRoutine = document.createElement("div");
          divRoutine.setAttribute("class", "routine");

          const divLefContent = document.createElement("div");
          divLefContent.setAttribute("class", "left-content");

          const divMainContent = document.createElement("div");
          divMainContent.setAttribute("class", "main-content");

          const img = document.createElement("img");
          img.setAttribute("src", "../assets/user_image.png");

          const h2 = document.createElement("h2");
          h2.textContent = rows[i].nome_remedio;

          const h5 = document.createElement("h5");
          h5.textContent = "Faz muito tempo";

          const check = document.createElement("input");

          const id = rows[i].id
          const nomeRemedio = rows[i].nome_remedio
            check.addEventListener('change',()=>{
                const confirmar = 
                db.transaction((tx)=>{
                    if(confirm(`Você tomou ${nomeRemedio} ?`)){
                        tx.executeSql(`UPDATE '${localStorage.getItem("RotKey")}' SET done = 1 WHERE id = ${id}`)
                        window.location.reload()
                    }
                })
            })

          check.setAttribute("type", "checkbox");
          check.setAttribute("name", "check");
          check.setAttribute("id", "check");
          divMainContent.appendChild(h2);
          divMainContent.appendChild(h5);
          divLefContent.appendChild(img);
          divLefContent.appendChild(divMainContent);
          divRoutine.appendChild(divLefContent);

          if (rows[i].done === 1) {
            done.appendChild(divRoutine);
          } else if (rows[i].done === 0) {
            divRoutine.appendChild(check);
            pending.appendChild(divRoutine);
          }
          
        }
      }, 1000);
    }
  );
});
