let expression = '';

function appendValue(value) {
    expression += value;
    document.getElementById('display').value = expression;
}

function appendOperator(operator) {
    if(operator === 'sqrt') {
        expression = 'sqrt(' + expression + ')';
    } else {
        expression += operator;
    }
    document.getElementById('display').value = expression;
}

function clearDisplay() {
    expression = '';
    document.getElementById('display').value = '';
}

async function calculate() {
    try {
        const response = await fetch('http://localhost:3000/calculate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({expression})
        });
        const data = await response.json();
        document.getElementById('display').value = data.result;
        expression = data.result.toString();
    } catch (err) {
        document.getElementById('display').value = 'Error';
        expression = '';
    }
}
