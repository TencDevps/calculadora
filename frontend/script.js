let pantalla = document.getElementById("pantalla");
let valorActual = "";
let operacion = null;
let numero1 = null;

function agregar(num) {
  valorActual += num;
  pantalla.innerText = valorActual;
}

function limpiar() {
  valorActual = "";
  numero1 = null;
  operacion = null;
  pantalla.innerText = "0";
}

function operar(op) {
  if (valorActual === "" && op !== "raiz") return;
  numero1 = parseFloat(valorActual);
  operacion = op;
  valorActual = "";
  pantalla.innerText = op === "raiz" ? `√(${numero1})` : op;
}

async function calcular() {
  let numero2 = valorActual !== "" ? parseFloat(valorActual) : null;

  let body = { operacion, numero1, numero2 };
  let resp = await fetch("/calcular", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  let data = await resp.json();
  pantalla.innerText = data.resultado ?? data.error;
  valorActual = data.resultado?.toString() || "";
}
