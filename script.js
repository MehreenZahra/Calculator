let screen = document.querySelector('#screen');
let buttons = document.querySelectorAll('.btn');

for (let item of buttons) {
    item.addEventListener('click', (e) => {
        let buttonText = e.target.innerText;

        // Handle special cases for buttons
        if (buttonText === 'x') buttonText = '*';
        if (buttonText === '÷') buttonText = '/';
        if (buttonText === '%') buttonText = '*0.01';
        if (buttonText === '𝝅') buttonText = '𝝅'; // Handle 𝝅 button

        // Append the button text to the screen
        screen.value += buttonText;
    });
}

function appendPi(){
    screen.value += '𝝅';
}
function appendSin() {
    screen.value += 'sin('; 
}

function appendCos() {
    screen.value += 'cos('; 
}

function appendTan() {
    screen.value += 'tan('; 
}
function appendFactorial() {
    const num = screen.value; 
    if (num === "" || isNaN(num)) {
        screen.value = "Error: Invalid Input"; 
        return;
    }
    screen.value += '!'; 
}
function appendLog() {
    screen.value += 'log('; 
}
function appendSquareRoot() {
    screen.value += '√('; 
}
function appendE() {
    screen.value += 'e'; 
}
function appendExponentiation() {
    screen.value += '^'; 
}
function calculateFactorial(num) {
    let fact = 1;
    for (let i = 1; i <= num; i++) {
        fact *= i; 
    }
    return fact; 
}

function backSpace(){
    screen.value = screen.value.slice(0, -1);
}


// Function to evaluate expressions
function evaluateExpression(expression) {
    try {
        // Replace constants with their values
        expression = expression.replace(/𝝅/g, '* Math.PI').replace(/e/g, '2.7182');

        // Handle implicit multiplication for 𝝅 and e
        expression = expression.replace(/(\d+)(?=\s*Math\.PI)/g, '$1 * Math.PI'); // Handle cases like 5𝝅
        expression = expression.replace(/(\d+)(?=\s*Math\.E)/g, '$1 * Math.E'); // Handle cases like 5e
        expression = expression.replace(/(\))(?=\s*Math\.PI)/g, '$1 * Math.PI'); // Handle cases like (2 + 3)𝝅
        expression = expression.replace(/(\))(?=\s*Math\.E)/g, '$1 * Math.E'); // Handle cases like (2 + 3)e
        expression = expression.replace(/(\))(?=\s*e)/g, '$1 * '); // Handle cases like (2 + 3)e
        expression = expression.replace(/(\d+)(?=\()/g, '$1 * '); // Handle cases like 5(3+2)
        expression = expression.replace(/(\))(?=\d)/g, '$1 * '); // Handle cases like (2 + 3)2
        // Log the expression for debugging
        console.log("Expression after replacements:", expression);

        // Evaluate scientific functions
        expression = expression.replace(/sin\(([^)]+)\)/g, (match, p1) => {
            return Math.sin(parseFloat(p1)).toFixed(4); 
        });
        expression = expression.replace(/cos\(([^)]+)\)/g, (match, p1) => {
            return Math.cos(parseFloat(p1)).toFixed(4); 
        });
        expression = expression.replace(/tan\(([^)]+)\)/g, (match, p1) => {
            return Math.tan(parseFloat(p1)).toFixed(4); 
        });
         // Handle exponentiation
        expression = expression.replace(/(\d+)\^(\d+)/g, (match, base, exponent) => {
            return Math.pow(parseFloat(base), parseFloat(exponent)).toFixed(4); 
        });
        // Handle logarithms
        expression = expression.replace(/log\(([^)]+)\)/g, (match, p1) => {
            const value = parseFloat(p1);
            if (isNaN(value) || value <= 0) {
                return "Error: Invalid Input"; // Handle log of non-positive numbers
            }
            return Math.log(value).toFixed(10); // Calculate natural logarithm
        });
        // Handle square roots
        expression = expression.replace(/√(\d+)/g, (match, p1) => {
            const value = parseFloat(p1);
            if (isNaN(value) || value < 0) {
                return "Error: Invalid Input"; // Handle square root of negative numbers
            }
            return Math.sqrt(value).toFixed(4); 
        });
        // Check for factorial in the expression
        if (expression.endsWith('!')) {
            const num = parseInt(expression.slice(0, -1)); 
            if (isNaN(num) || num < 0) {
                return "Error: Invalid Input"; 
            }
            const result = calculateFactorial(num); 
            return result.toString();
        }
        
        // Evaluate the expression
        const result = eval(expression.replace(/\s+/g, '')); // Trim white spaces
       // Format the result
       if (Number.isInteger(result)) {
        return result.toString(); 
    } else {
        return result.toFixed(4); 
    } 
    } catch (error) {
        console.error("Error evaluating expression:", error); 
        return "Error: Invalid Expression"; 
    }
}
function calculate() {
    const expression = screen.value;
    const result = evaluateExpression(expression);
    screen.value = result; 
    addToHistory(expression, result); 
}

let history = [];

function addToHistory(expression, result) {
    history.push({ expression, result });
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = '';
    history.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.innerText = `${item.expression} = ${item.result}`;
        historyItem.onclick = () => {
            screen.value = item.expression;
        };
        historyContainer.appendChild(historyItem);
    });
}

function clearHistory() {
    history = [];
    updateHistoryDisplay();
}

