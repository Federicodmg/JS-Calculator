let firstNumber = "",
    secondNumber = "",
    operator,
    operatorIndex,
    hasOperator,
    numberBtn = document.querySelectorAll(".number"),
    noSecondNumber = document.querySelectorAll(".no-second-number"),
    directPrint = document.querySelectorAll(".print-value"),
    operatorBtn = document.querySelectorAll(".basic-operator"),
    input = document.querySelector("input");

function operate(num1, operation, num2) {
    switch (operation) {
        case "-":
            return (num1 - num2);
        case "+":
            return num1 + num2;
        case "/":
            if (num1 == 0 || num2 == 0) {
                clearInput();
                alert("Naughty naughty, 0 is a no-no in divisions!");
            } else {
                return (num1 / num2);
            }
            break;
        case "*":
            return num1 * num2;
        case "x":
            return num1 * num2;
        case "pow":
            return Math.pow(num1, num2);
        case "^":
            return Math.pow(num1, num2);
    }
}

function clearInput() {
    input.value = "";
    firstNumber = "";
    secondNumber = "";
    operator = "";
    hasOperator = false;
}

document.getElementById("clear-btn").addEventListener("click", clearInput);

document.getElementById("result-btn").addEventListener("click", (e) => {
    if (!operator && !secondNumber || operator && !secondNumber) return;
    let result = (operate(+firstNumber, operator, +secondNumber));
    operator = "";
    hasOperator = false;

    if (result.toString().includes(".") && result.toString().length > 8) {
        input.value = result.toFixed(6).toString();
        firstNumber = result.toFixed(6).toString();
    } else {
        input.value = result.toString();
        firstNumber = result.toString();
    }
    secondNumber = "";
});

document.getElementById("zero").addEventListener("click", e => {
    if (!hasOperator && input.value != "0") {
        firstNumber += e.target.value;
        input.value += e.target.value;
    }
    if (hasOperator && input.value.charAt(operatorIndex + 1) != "0") {
        secondNumber += e.target.value;
        input.value += e.target.value;
    }
});

numberBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        if (!hasOperator && input.value == "0") {
            input.value = e.target.value;
            firstNumber = e.target.value;
        } else if (!hasOperator) {
            input.value += e.target.value;
            firstNumber += e.target.value;
        } else if (hasOperator) {
            input.value += e.target.value;
            secondNumber += e.target.value;
        }
    });
});

operatorBtn.forEach(btn => {
    btn.addEventListener("click", e => {
        if (!operator && input.value.slice(-1) == ".") return;

        if (!operator && !firstNumber && e.target.value != "-") {
            return;
        } else if (!operator && !firstNumber) {
            input.value = e.target.value;
        } else if (!operator) {
            operatorIndex = input.value.length;
            firstNumber = input.value;
            operator = e.target.value;
            input.value += e.target.value;
            hasOperator = true;
        } else if (operator && !secondNumber) {
            operator = e.target.value;
            input.value = input.value.slice(0, -1);
            input.value += e.target.value;
        } else if (firstNumber && secondNumber) {
            let result = (operate(+firstNumber, operator, +secondNumber));
            operator = e.target.value;
            input.value = `${result.toString()}${e.target.value}`;
            firstNumber = result.toString();
            secondNumber = "";
        }
    });
});

document.querySelector("#multiply").addEventListener("click", function (e) {
    if (!operator && input.value.slice(-1) == ".") return;

    if (!operator && !firstNumber) {
        return;
    } else if (!operator) {
        operatorIndex = input.value.length;
        firstNumber = input.value;
        operator = e.target.value;
        input.value += "x";
        hasOperator = true;
    } else if (operator && !secondNumber) {
        operator = e.target.value;
        input.value = input.value.slice(0, -1);
        input.value += "x";
    } else if (firstNumber && secondNumber) {
        let result = (operate(+firstNumber, operator, +secondNumber));
        operator = e.target.value;
        input.value = `${result.toString()}x`;
        firstNumber = result.toString();
        secondNumber = "";
    }
});

document.querySelector("#pow-operator").addEventListener("click", function (e) {
    if (!operator && input.value.slice(-1) == ".") return;

    if (!operator && !firstNumber) {
        return;
    } else if (!operator) {
        operatorIndex = input.value.length;
        firstNumber = input.value;
        operator = e.target.value;
        input.value += "^";
        hasOperator = true;
    } else if (operator && !secondNumber) {
        operator = e.target.value;
        input.value = input.value.slice(0, -1);
        input.value += "^";
    } else if (firstNumber && secondNumber) {
        let result = (operate(+firstNumber, operator, +secondNumber));
        operator = e.target.value;
        input.value = `${result.toString()}^`;
        firstNumber = result.toString();
        secondNumber = "";
    }
});

directPrint.forEach(btn => {
    btn.addEventListener("click", function (e) {
        if (!hasOperator) {
            input.value = Math[e.target.value].toFixed(6).toString();
            firstNumber = Math[e.target.value].toFixed(6).toString();
        } else if (hasOperator) {
            input.value = `${firstNumber}${operator}${Math[e.target.value].toFixed(6).toString()}`;
            secondNumber = Math[e.target.value].toFixed(6).toString();
        }
    });
});

noSecondNumber.forEach(btn => {
    btn.addEventListener("click", e => {
        if (!operator && input.value == "") return;
        if (operator && !secondNumber) return;

        let currentOperation = Math[e.target.value],
            firstNumberOperation = currentOperation(input.value),
            secondNumberOperation = currentOperation(secondNumber);

        if (!hasOperator) {
            input.value = firstNumberOperation.toFixed(6).toString();
            firstNumber = firstNumberOperation.toFixed(6).toString();
        } else if (hasOperator) {
            if (secondNumberOperation.toString().charAt(0) == "-") {
                input.value = `${firstNumber}${secondNumberOperation.toFixed(6).toString()}`;
                secondNumber = secondNumberOperation.toFixed(6).toString();
            } else {
                input.value = `${firstNumber}${operator}${secondNumberOperation.toFixed(6).toString()}`;
                secondNumber = secondNumberOperation.toFixed(6).toString();
            }
        }
    });
});

document.querySelector("#factorial").addEventListener("click", () => {
    if (hasOperator && secondNumber) return;
    if (!hasOperator) {
        input.value = factorial(input.value).toString();
        firstNumber = factorial(input.value).toString();
    } else if (hasOperator) {
        input.value = `${firstNumber}${operator}${factorial(secondNumber).toString()}`;
        secondNumber = factorial(secondNumber).toString();
    }
});

document.querySelector("#erase-btn").addEventListener("click", () => {
    if (!hasOperator) {
        input.value = input.value.slice(0, -1);
        firstNumber = firstNumber.slice(0, -1);
    } else if (hasOperator && input.value.charAt(operatorIndex + 1)) {
        input.value = input.value.slice(0, -1);
        secondNumber = secondNumber.slice(0, -1);
    } else if (hasOperator && input.value.charAt(operatorIndex)) {
        input.value = input.value.slice(0, -1);
        operator = operator.slice(0, -1);
        hasOperator = false;
    }
});

document.querySelector("#decimal").addEventListener("click", function (e) {
    let secondSection = input.value.slice(operatorIndex);

    if (!hasOperator && !input.value.includes(".")) {
        input.value += e.target.value;
        firstNumber += e.target.value;
    } else if (hasOperator && !secondNumber) {
        input.value += `0${e.target.value}`;
        secondNumber += e.target.value;
    } else if (hasOperator && !secondSection.includes(".")) {
        input.value += e.target.value;
        secondNumber += e.target.value;
    }
});

function factorial(num) {
    let result = 1;
    let i = 1;

    while (i <= num) {
        result *= i;
        i++;
    }

    return result;
}