//alert("hello");

function CalculateTwoNumbers(){
    let number1 = parseInt(document.getElementById("FirstNumber").value);
    let number2 = parseInt(document.getElementById("SecondNumber").value);

    let operationType = document.getElementById("OperationType").value;


    switch(OperationType){
    case "Add":
        let result = AddTwoNumbers(number1, number2);
        document.getElementById("Result").innerText = number1 + number2;
        break;
    
    case "Subtract":
        let result = SubtractTwoNumbers(number1, number2);
        document.getElementById("Result").innerText = number1 - number2;
        break;
    
    case "Multiply":
        let result = MultiplyTwoNumbers(number1, number2);
        document.getElementById("Result").innerText = number1 * number2;
        break;
    
    default:
        let result = DivideTwoNumbers(number1, number2);
        document.getElementById("Result").innerText = number1 / number2;
    }


function AddTwoNumbers(num1, num2){
    let result = num1 + num2;
    return result;
}
function SubtractTwoNumbers(num1, num2){
    let result = num1 - num2;
    return result;
}
function MultiplyTwoNumbers(num1, num2){
    let result = num1 * num2;
    return result;
}
function DivideTwoNumbers(num1, num2){
    let result = num1 / num2;
    return result;
}
}