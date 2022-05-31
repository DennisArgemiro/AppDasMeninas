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

export function showRoutines() {
  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM routines",
      [],
      function (tx, resultado) {
        var rows = resultado.rows;
        var div = "";
        var rot = document.querySelector(".listas-rotina");

        for (var i = 0; i < rows.length; i++) {
          div += '<div>';
          div += "<div class='remedio-specs'>";
          div += '<img src="/assets/user_image.png" />';
          div += '<div class="data-main">';
          div += "<h1>" + rows[i].nome + "</h1>";
          div += "<h5>" + rows[i].desc + "</h5>";
          div += "</div>";
          div += "</div>";
        }

        rot.innerHTML = div;
      },
      null
    );
  });
}

export function insertMedicines(nomeInput,descInput){
  db.transaction(function (tx) {
    tx.executeSql("INSERT INTO medicines (nome, desc) VALUES(?,?)", [
      nomeInput,
      descInput,
    ]);
  });
}

export function showMedicines(){
  db.transaction(function (tx){
    tx.executeSql("SELECT * FROM medicines", [], function (tx, result){
        var rows = result.rows;
        var div = "";
        var rot = document.querySelector(".item-results");

        for (var i = 0; i < rows.length; i++) {
          div += "<button class='medicine' onclick='showId()'>";
          div += '<img src="/assets/user_image.png"/>';
          div += '<div class="data-main">';
          div += "<h1 id='"+rows[i].nome.trim()+"'>" + rows[i].nome + "</h1>";
          div += "<h5>" + rows[i].desc + "</h5>";
          div += "";
          div += "</div>";
          div += "</button>";
          div += "<script>";
          div += " async function showId( ){";
          div += "window.setTimeOut('(){";
          div += "const cont = document.querrySelector('#"+rows[i].nome+"')";
          div += "console.log(cont.id)";
          div += "}',2000)";
          div += "</script>";
          div += "";
        }

        rot.innerHTML = div
    }, null)
  })
}