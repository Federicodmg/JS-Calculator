const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const basicOperations = ["+", "x", "*", "/", "-", "^"];

document.querySelector(".text-input").addEventListener("keydown", (e) => {
    if (basicOperations.includes(e.key)) {
        keyboardBasicOperations(e);
    } else if (e.key == "Enter") {
        keyboardOperate();
    } else if (nums.includes(e.key)) {
        keyboardNumbers(e);
    } else if (e.key == "0") {
        keyboardZero(e);
    } else if (e.key == "Backspace") {
        keyboardDelete();
    } else if (e.key == "!") {
        keyboardFactorial(e);
    } else if (e.key == ".") {
        keyboardDecimal(e);
    } else if (e.key == "l") {
        oneArgumentFunctions(e, "log10");
    } else if (e.key == "n") {
        oneArgumentFunctions(e, "log");
    } else if (e.key == "q") {
        oneArgumentFunctions(e, "sqrt");
    } else if (e.key == "s") {
        oneArgumentFunctions(e, "sin");
    } else if (e.key == "o") {
        oneArgumentFunctions(e, "cos");
    } else if (e.key == "t") {
        oneArgumentFunctions(e, "tan");
    } else if (e.key == "e") {
        keyboardDirectPrint(e, "E");
    } else if (e.key == "p") {
        keyboardDirectPrint(e, "PI");
    } else if (e.key == "Delete") {
        keyboardClear();
    }
});

function keyboardClear() {
    input.value = "";
    firstNumber = "";
    secondNumber = "";
    operator = "";
    hasOperator = false;
}

function keyboardDirectPrint(e, operation) {
    if (!hasOperator) {
        input.value = Math[operation].toFixed(6).toString();
        firstNumber = Math[operation].toFixed(6).toString();
        e.preventDefault();
    } else if (hasOperator) {
        input.value = `${firstNumber}${operator}${Math[operation].toFixed(6).toString()}`;
        secondNumber = Math[operation].toFixed(6).toString();
        e.preventDefault();
    }
}

function oneArgumentFunctions(e, operation) {
    if (!operator && input.value == "") {
        e.preventDefault();
        return;
    }
    if (operator && !secondNumber) {
        e.preventDefault();
        return;
    }

    let currentFunction = Math[operation],
        firstNumberFunction = currentFunction(input.value).toFixed(6).toString(),
        secondNumberFunction = currentFunction(secondNumber).toFixed(6).toString();

    console.log(secondNumberFunction);
    if (!hasOperator) {
        input.value = firstNumberFunction;
        firstNumber = firstNumberFunction;
        e.preventDefault();
    } else if (hasOperator) {
        if (secondNumberFunction.charAt(0) == "-" && operator != "-") {
            input.value = `${firstNumber}${secondNumberFunction}`;
            secondNumber = secondNumberFunction;
            e.preventDefault();
        } else if (secondNumberFunction.charAt(0) == "-" && operator == "-") {
            input.value = `${firstNumber}+${secondNumberFunction.slice(1)}`;
            secondNumber = secondNumberFunction;
            e.preventDefault();
        } else {
            input.value = `${firstNumber}${operator}${secondNumberFunction}`;
            secondNumber = secondNumberFunction;
            e.preventDefault();
        }
    }
}

function keyboardBasicOperations(e) {
    if (!operator && input.value.slice(-1) == ".") {
        e.preventDefault();
        return;
    }

    if (!operator && !firstNumber && e.key != "-") {
        e.preventDefault();
    } else if (!operator && !firstNumber) {
        input.value = e.key;
        e.preventDefault();
    } else if (!operator) {
        operatorIndex = input.value.length;
        firstNumber = input.value;
        operator = e.key;
        hasOperator = true;
    } else if (operator && !secondNumber) {
        operator = e.key;
        input.value = input.value.slice(0, -1);
    } else if (firstNumber && secondNumber) {
        let result = (operate(+firstNumber, operator, +secondNumber));
        operator = e.key;
        input.value = `${result.toString()}${e.key}`;
        firstNumber = result.toString();
        secondNumber = "";
        e.preventDefault();
    }
}

function keyboardDecimal(e) {
    let secondSection = input.value.slice(operatorIndex);

    if (!hasOperator && !input.value.includes(".")) {
        input.value += e.key;
        firstNumber += e.key;
        e.preventDefault();
    } else if (!hasOperator && input.value.includes(".")) {
        e.preventDefault();
    } else if (hasOperator && !secondNumber) {
        input.value += `0${e.key}`;
        secondNumber += e.key;
        e.preventDefault();
    } else if (hasOperator && !secondSection.includes(".")) {
        input.value += e.key;
        secondNumber += e.key;
        e.preventDefault();
    } else if (hasOperator && secondSection.includes(".")) {
        e.preventDefault();
    }
}

function keyboardDelete() {
    if (!hasOperator) {
        firstNumber = firstNumber.slice(0, -1);
    } else if (hasOperator && input.value.charAt(operatorIndex + 1)) {
        secondNumber = secondNumber.slice(0, -1);
    } else if (hasOperator && input.value.charAt(operatorIndex)) {
        operator = operator.slice(0, -1);
        hasOperator = false;
    }
}

function keyboardFactorial(e) {
    if (hasOperator && !secondNumber) {
        e.preventDefault();
        return;
    }
    if (!hasOperator) {
        input.value = factorial(input.value).toString();
        firstNumber = factorial(input.value).toString();
        e.preventDefault();
    } else if (hasOperator && secondNumber) {
        input.value = `${firstNumber}${operator}${factorial(secondNumber).toString()}`;
        secondNumber = factorial(secondNumber).toString();
        e.preventDefault();
    }
}

function keyboardOperate() {
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
}

function keyboardNumbers(e) {
    if (!hasOperator && input.value == "0") {
        firstNumber = e.key;
        input.value = e.key;
        e.preventDefault();
    } else if (!hasOperator) {
        firstNumber += e.key;
    } else if (hasOperator) {
        secondNumber += e.key;
    }
}

function keyboardZero(e) {
    if (!hasOperator && input.value == "0") {
        e.preventDefault();
    } else if (!hasOperator && input.value != "0") {
        firstNumber += e.key;
    } else if (hasOperator && secondNumber == "0") {
        e.preventDefault();
    } else {
        secondNumber += e.key;
    }
}
