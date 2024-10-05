let display = document.querySelector('.display');
let currentInput = '';
let previousInput = '';
let operator = '' ;
let shouldResetScreen = false;  

function appendNumber(number) {
    if (shouldResetScreen) {
        display.textContent = number;
        shouldResetScreen = false;
    } else {
        if (display.textContent === '0') {
            display.textContent = number;
        } else {
            display.textContent += number;
        }
    }
    currentInput += number;
}

function chooseOperator(op) {
    if (currentInput === '') return; // Avoid operator without a number
    if (operator !== '') calculate(); // If there's already an operator, calculate
    operator = op;
    previousInput = currentInput; // Store the first number
    currentInput = '';
    display.textContent += ` ${op} `; // Display operator on screen
}

function clearDisplay() {
    display.textContent = '0';
    currentInput = '';
    previousInput = '';
    operator = '';
}

function deleteNumber() {
    display.textContent = display.textContent.toString().slice(0, -1);
    currentInput = currentInput.slice(0, -1);
}

function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;  // Don't compute if inputs are invalid

    switch (operator) {
        case '+':
            computation = prev + curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case '*':
            computation = prev * curr;
            break;
        case '/':
            computation = prev / curr;
            break;
        default:
            return;
    }
    display.textContent = computation;
    currentInput = computation.toString();
    operator = '';
    previousInput = '';
    shouldResetScreen = true;
}

function addDecimal() {
    if (currentInput.includes('.')) return; // Prevent adding multiple decimals
    currentInput += '.';
    display.textContent += '.';
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            appendNumber(button.textContent);
        } else if (button.classList.contains('operator')) {
            chooseOperator(button.textContent);
        } else if (button.classList.contains('equal')) {
            calculate();
        } else if (button.classList.contains('clear')) {
            clearDisplay();
        } else if (button.classList.contains('delete')) {
            deleteNumber();
        } else if (button.classList.contains('decimal')) {
            addDecimal();
        }
    });
});
