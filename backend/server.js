const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.post("/calcular", (req, res) => {
  const { operacion, numero1, numero2 } = req.body;
  let resultado;

  try {
    switch (operacion) {
      case "suma": resultado = numero1 + numero2; break;
      case "resta": resultado = numero1 - numero2; break;
      case "multiplicacion": resultado = numero1 * numero2; break;
      case "division": 
        if (numero2 === 0) throw "División por cero";
        resultado = numero1 / numero2; 
        break;
      case "modulo": resultado = numero1 % numero2; break;
      case "potencia": resultado = Math.pow(numero1, numero2); break;
      case "raiz": resultado = Math.sqrt(numero1); break;
      case "divisionEntera": resultado = Math.floor(numero1 / numero2); break;
      default: throw "Operación no válida";
    }
    res.json({ resultado });
  } catch (err) {
    res.status(400).json({ error: err.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
