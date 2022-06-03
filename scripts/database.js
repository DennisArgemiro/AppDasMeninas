//banco de dados
export var db = openDatabase("dbApp", "1.0", "LocalDB", 4 * 1024 * 1024);
db.transaction(function (tx) {
  tx.executeSql(
    "CREATE TABLE medicines (id INTEGER PRIMARY KEY, nome TEXT, desc TEXT, hour DATATIME)"
  );
});

db.transaction(function (tx) {
  tx.executeSql(
    "CREATE TABLE routines (id INTEGER PRIMARY KEY, nome TEXT, desc TEXT)"
  );
});

export function insertRoutine(nomeInput, descInput) {
  db.transaction(function (tx) {
    tx.executeSql("INSERT INTO routines (nome, desc) VALUES(?,?)", [
      nomeInput,
      descInput,
    ]);
  });
}

export function insertMedicines(nomeInput, descInput) {
  db.transaction(function (tx) {
    tx.executeSql("INSERT INTO medicines (nome, desc) VALUES(?,?)", [
      nomeInput,
      descInput,
    ]);
  });
}
var confirmar = false;

export function getMedicines(filter) {
  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM medicines",
      [],(tx, result)=>{
        returnMedicines(result)
      },
      null
    );
    
  });
}
export function returnMedicines(result) {
  var rows = result.rows;
  const itens = document.querySelector(".item-results");
  for (var i = 0; i < rows.length; i++) {
    const button = document.createElement("button");
    button.className = "medicine";
    button.setAttribute("id", `btn-${i}`);
    button.value = rows[i].nome;
    

    const img = document.createElement("img");
    img.setAttribute("src", "../assets/user_image.png");

    const div = document.createElement("div");
    div.className = "data-main";

    const h1 = document.createElement("h1");
    h1.textContent = rows[i].nome;

    const h5 = document.createElement("h5");
    h5.textContent = rows[i].desc;

    /////////////////////////
    div.appendChild(h1);
    div.appendChild(h5);
    button.appendChild(img);
    button.appendChild(div);

    itens.appendChild(button);

    button.addEventListener('click', ()=>{
      window.localStorage.setItem('key', button.value)
      window.location.href = "../pages/description.html"
    })
  }
}
