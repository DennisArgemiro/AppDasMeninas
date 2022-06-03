import { db } from "../scripts/database.js";

window.setTimeout(() => {
  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM routines",
      [],
      (tx, result) => {
        console.log("entrei no db");
        returnRoutines(result);
      },
      null
    );
  });

  function returnRoutines(result) {
    var rows = result.rows;
    console.log(rows);
    for (var i = 0; i < rows.length; i++) {
      const button = document.createElement("button");
      const lista = document.querySelector(".listas-rotina");

      button.setAttribute("class", "rotina");
      button.setAttribute("value", rows[i].nome);

      const img = document.createElement("img");
      img.setAttribute("src", "./assets/user_image.png");

      const div1 = document.createElement("div");
      div1.setAttribute("class", "remedio-specs");

      const div2 = document.createElement("div");
      div2.setAttribute("class", "data-main");

      const h1 = document.createElement("h1");
      h1.textContent = rows[i].nome;

      const h5 = document.createElement("h5");
      h5.textContent = rows[i].desc;

      div2.appendChild(h1);
      div2.appendChild(h5);
      div1.appendChild(img);
      div1.appendChild(div2);
      button.appendChild(div1);
      lista.appendChild(button);

      button.addEventListener("click", () => {
        window.localStorage.setItem('RotKey', button.value)
        window.location.href = '../pages/routine.html'
      });
    }
  }
}, 1000);
