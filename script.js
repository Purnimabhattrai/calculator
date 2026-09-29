const numberButtons = document.querySelectorAll("[data-number]"); //finds all numbers
const operationButtons = document.querySelectorAll("[data-operation]");//finds all operator

const currentDisplay = document.getElementById("current-display");
const previousDisplay = document.getElementById("previous-display");

const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const equalsButton = document.getElementById("equals");

//variables declaration
let currentNumber="";
let previousNumber="";
let operation=undefined;

numberButtons.forEach(button =>{
    button.addEventListener("click", () => {
        appendNumber(button.dataset.number);
        updateDisplay();
    });
});
function appendNumber(number) {

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    currentNumber += number;
}

function updateDisplay() {

    currentDisplay.innerText = currentNumber || "0";

    if (operation != null) {

        previousDisplay.innerText =
            `${previousNumber} ${operation}`;

    } else {

        previousDisplay.innerText = "";

    }
}

operationButtons.forEach(button => {

    button.addEventListener("click", () => {

        chooseOperation(button.dataset.operation);

        updateDisplay();

    });

});


function chooseOperation(selectedOperation) {

    if (currentNumber === "") {
        return;
    }

    if (previousNumber !== "") {
        calculate();
    }

    operation = selectedOperation;

    previousNumber = currentNumber;

    currentNumber = "";
}

//calculation logic
function calculate() {

    const previous = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    if (isNaN(previous) || isNaN(current)) {
        return;
    }

    let result;

    switch (operation) {

        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "*":
            result = previous * current;
            break;

        case "/":
            if (current === 0) {
                currentNumber = "Cannot divide by 0";
                return;
            }

            result = previous / current;
            break;

        case "%":
            result = previous % current;
            break;

        default:
            return;
    }

    currentNumber = result;

    previousNumber = "";

    operation = undefined;
}

equalsButton.addEventListener("click", () => {

    calculate();

    updateDisplay();

});

clearButton.addEventListener("click", () => {

    currentNumber = "";
    previousNumber = "";
    operation = undefined;

    updateDisplay();

});
deleteButton.addEventListener("click", () => {

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();

});