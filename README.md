# JS Calculator
 
The website of this repository is https://federicodmg.github.io/JS-Calculator/

This calculator has a firstNumber, that being everything to the left of the first operator, the operator and a secondNumber.
operatorIndex indicates the index where the operator lies within the input value, and hasOperator indicates whether it exists or not.

Operations are divided into many groups :
1) "number", which just adds numbers to the calculator.
2) "basic-operator", which consists of all basic operations and power (power is in another function so that the value change when it is input doesn't become "Math.POW", same for multipliply)
3) "zero", which is in charge of placing and controlling if zeros can be added or not.
4) "decimal", which does the same as zero, except with decimal points.
5) "result-btn", which gives the user the result when firstNumber, an operator and secondNumber are present.
6) "factorial", which gives the factorial of a number written previously.
7) "no-second-number", which performs an operation such as sin, tan, lg, ln, those who change the value of the current input but not its position, and only need one parameter.
8) "print-value", which prints E or PI.
9) "clear-btn", which resets the calculator.
10) "erase-btn", which deletes the last user input.
