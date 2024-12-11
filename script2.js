let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

// Select the display element
const display = document.querySelector('.display');

// Function to update the display
function updateDisplay() {
    display.textContent = displayValue;
}

// Function to handle number button clicks
function handleNumberClick(number) {
    // If waiting for second operand, replace or append to display value
    if (waitingForSecondOperand) {
        displayValue = number;
        waitingForSecondOperand = false;
    } else {
        // If display is '0', replace; otherwise append
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

// Function to handle operator button clicks
function handleOperatorClick(nextOperator) {
    const inputValue = parseFloat(displayValue);

    // If this is the first time an operator is pressed
    if (firstOperand === null) {
        firstOperand = inputValue;
    } 
    // If we already have a first operand and an operator
    else if (operator) {
        const result = calculate(firstOperand, operator, inputValue);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    // Add this line to show the operator in the display
    displayValue += ` ${nextOperator} `;

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateDisplay();
}

// Function to calculate result
function calculate(firstOperand, operator, secondOperand) {
    switch(operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            // Handle division by zero
            return secondOperand === 0 ? 'Error' : firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

// Function to handle clear button
function handleClearClick() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

// Function to handle equals button
function handleEqualsClick() {
    if (operator && !waitingForSecondOperand) {
        const secondOperand = parseFloat(displayValue);
        const result = calculate(firstOperand, operator, secondOperand);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
        operator = null;
        waitingForSecondOperand = true;
        updateDisplay();
    }
}

// Event listeners for number buttons
document.querySelectorAll('.right button').forEach(button => {
    button.addEventListener('click', () => handleNumberClick(button.textContent));
});

// Event listeners for operator buttons
document.querySelectorAll('.left button').forEach(button => {
    const buttonText = button.textContent;
    if (['+', '-', '*', '/'].includes(buttonText)) {
        button.addEventListener('click', () => handleOperatorClick(buttonText));
    } else if (buttonText === 'clear') {
        button.addEventListener('click', handleClearClick);
    } else if (buttonText === '=') {
        button.addEventListener('click', handleEqualsClick);
    }
});

// Initial display update
updateDisplay();