// Select the display element
const display = document.querySelector('.display');

// Function to update the display
function updateDisplay() {
    display.textContent = displayValue;
}

function add(a, b) {
    return a + b;
}
function substract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

let num1, operator, num2;

function operate(num1, operator, num2) {
    if (operator == "+") {
        add(num1, num2);
    }
    else if (operator == "-") {
        substract(num1, num2);
    }

    else if (operator == "*") {
        multiply(num1, num2);
    }

    else if (operator == "/") {
        divide(num1, num2);
    }
    else{
        return "Error";
    }
}