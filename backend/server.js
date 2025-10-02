const express = require("express");
const cors = require("cors");
const math = require("mathjs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Servir frontend (carpeta public)
app.use(express.static(path.join(__dirname, "public")));

app.post("/calculate", (req, res) => {
    try {
        let { expression } = req.body;

        // Soporte para raíz cuadrada
        expression = expression.replace(/sqrt\((.*?)\)/g, (_, val) => `sqrt(${val})`);

        // Evaluar expresión
        const result = math.evaluate(expression);

        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: "Expresión inválida" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Calculadora lista en http://localhost:${PORT}`));
