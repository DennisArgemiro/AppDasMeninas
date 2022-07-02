//banco de dados
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const email = "";
const password  = ""

const urlKey = ""
const apiKey =  ""

export const supabase = createClient(
  urlKey,
 
);

async () => {
  const { user, error } = await supabase.from("lembreme").auth.signin({
    email: email,
    password: password,
  });
};
export async function insertMedicines(inputVenda, inputOriginal, inputDesc) {
  const { data, error } = await supabase.from("lembreme").insert([
    {
      nomeVenda: inputVenda,
      nomeOriginal: inputOriginal,
      desc: inputDesc,
    },
  ]);
}

///////////////////////////////////////////////////////////////////////////////

export var db = openDatabase("dbApp", "1.0", "LocalDB", 4 * 1024 * 1024);
db.transaction(function (tx) {
  tx.executeSql(
    "CREATE TABLE medicines (id INTEGER PRIMARY KEY, nomeVenda TEXT,nomeOriginal TEXT, desc TEXT, hour DATATIME)"
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

// export function insertMedicines(nomeVendaInput, nomeOriginalInput,  descInput) {
//   db.transaction(function (tx) {
//     tx.executeSql(`INSERT INTO medicines (nomeVenda, nomeOriginal, desc) VALUES(?,?,?)`, [
//       nomeVendaInput,
//       nomeOriginalInput,
//       descInput,
//     ]);
//   });
// }

export async function returnMedicines(result) {

    const { data, error } = await supabase.from("lembreme").select();
    var rows = data;

  const itens = document.querySelector(".item-results");
  for (var i = 0; i < rows.length; i++) {
    const button = document.createElement("button");
    button.className = "medicine";
    button.setAttribute("id", `btn-${i}`);
    button.value = rows[i].nomeVenda;

    const img = document.createElement("img");
    img.setAttribute("src", "../assets/user_image.png");

    const div = document.createElement("div");
    div.className = "data-main";

    const h1 = document.createElement("h1");
    h1.textContent = rows[i].nomeVenda;

    const h5 = document.createElement("h5");
    h5.textContent = rows[i].nomeOriginal;

    /////////////////////////
    div.appendChild(h1);
    div.appendChild(h5);
    button.appendChild(img);
    button.appendChild(div);

    itens.appendChild(button);

    button.addEventListener("click", () => {
      window.localStorage.setItem("key", button.value);
      window.location.href = "../pages/description.html";
    });
  }
}

export function createRoutine(routineName, medName) {
  db.transaction(function (tx) {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS '${routineName}' (id INTEGER PRIMARY KEY, nome_remedio TEXT, done INTEGER)`
    );
    tx.executeSql(
      `INSERT INTO '${routineName}' (nome_remedio, done) VALUES(?,?)`,
      [medName, 0]
    );
  });
}
