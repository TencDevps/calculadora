const express = require('express');
const cors = require('cors');
const math = require('mathjs');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/calculate', (req, res) => {
    try {
        let { expression } = req.body;

        // Reemplazar la raíz cuadrada si existe
        expression = expression.replace(/sqrt\((.*?)\)/g, (_, val) => `sqrt(${val})`);

        // Calcular la expresión usando mathjs
        const result = math.evaluate(expression);

        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: 'Expresión inválida' });
    }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
