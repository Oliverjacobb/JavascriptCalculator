//Work out how to prevent further button presses after calculation complete
//sort out delete function

const calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: null,
    operator: null,
    calculation: null
};

function inputNumber(number) {

    const {
        displayValue,
        firstOperand,
        secondOperand,
        operator,
        calculation
    } = calculator;

    if (firstOperand === null && number !== '0' && operator === null) {
        calculator.displayValue = number;
        calculator.firstOperand = number;
    }
    if (firstOperand !== null && operator === null) {
        calculator.displayValue = displayValue + number;
        calculator.firstOperand = firstOperand + number;
    }

    if (firstOperand !== null && operator !== null) {
        calculator.displayValue = displayValue + number;
        calculator.secondOperand = number;
    }

    if (secondOperand !== null) {
        calculator.displayValue = displayValue + number;
        calculator.secondOperand = secondOperand + number;
    }

}



//updates display when decimal clicked
function inputDecimal(dot) {

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

//updates display and data when operator clicked

function inputOperator(OperatorType) {
    const {
        displayValue,
        operator,
        firstOperand
    } = calculator;

    if (firstOperand !== null && operator === null) {
        calculator.operator = OperatorType;
        calculator.displayValue = displayValue + calculator.operator;
    }
}

//function to perform calculation and update display accordingly
function performCalculation() {
    const {
        displayValue,
        firstOperand,
        secondOperand,
        operator,
        calculation
    } = calculator;

    if (firstOperand !== null && secondOperand !== null && operator !== null) {
        if (operator == "+") {
            calculator.calculation = parseFloat(firstOperand) + parseFloat(secondOperand);
        }

        if (operator == "-") {
            calculator.calculation = parseFloat(firstOperand) - parseFloat(secondOperand);
        }

        if (operator == "X") {
            calculator.calculation = parseFloat(firstOperand) * parseFloat(secondOperand);
        }

        if (operator == "÷") {
            calculator.calculation = parseFloat(firstOperand) / parseFloat(secondOperand);
        }

        if (operator == "%") {
            calculator.calculation = parseFloat(firstOperand) % parseFloat(secondOperand);
        }
    }
    calculator.displayValue = calculator.calculation;
    updateDisplay();
    calculator.displayValue = null;
    calculator.firstOperand = null;
    calculator.secondOperand = null;
    calculator.operator = null;
}

//clears display and previous data

function clear() {
    const {
        displayValue,
        firstOperand,
        secondOperand,
        operator,
        calculation
    } = calculator;

    calculator.displayValue = '0',
        calculator.firstOperand = null,
        calculator.secondOperand = null,
        calculator.operator = null,
        calculator.calculation = null
}

//deals with actually enabling/disabling the calc based on power button

function disableButtons() {
    var buttons = document.querySelectorAll('#key');

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.add('disabled');
    }
}

function activateButtons() {
    var buttons = document.querySelectorAll('#key');

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('disabled');
    }
}

//power button to turn calculator off/on

function power(state) {

    const {
        displayValue
    } = calculator;

    let powerButton = document.querySelector('.keyOff');

    if (state === 'OFF') {
        powerButton.innerHTML = 'ON';
        powerButton.classList.remove("btn-danger");
        powerButton.classList.add("btn-success");
        calculator.displayValue = "";
        disableButtons();
    } else {
        powerButton.innerHTML = 'OFF';
        powerButton.classList.remove("btn-success");
        powerButton.classList.add("btn-danger");
        calculator.displayValue = "0";
        activateButtons();
    }

}

function updateDisplay() {
    const display = document.querySelector('.display');
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.buttonContainer');

//detect which button/key has been clicked
keys.addEventListener('click', (event) => {
    const {
        target
    } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('keyOperator')) {
        inputOperator(target.innerHTML);
        updateDisplay();
        return;
    }

    if (target.classList.contains('keyOff')) {
        power(target.innerHTML);
        updateDisplay();
        return;
    }

    if (target.classList.contains('keyClear')) {
        clear();
        updateDisplay();
        return;
    }
    if (target.classList.contains('keyEqual')) {
        performCalculation();
        return;
    }
    if (target.classList.contains('keyDecimal')) {
        inputDecimal(target.innerHTML);
        updateDisplay();
        return;
    }
    if (target.classList.contains('number')) {
        inputNumber(target.innerHTML);
        updateDisplay();
        return;
    }

});