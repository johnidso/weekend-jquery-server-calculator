$(document).ready(onReady);

function onReady(){
    $('#addButton').on("click", setOperator),
    $('#subtractButton').on("click", setOperator),
    $('#multiplyButton').on("click", setOperator),
    $('#divideButton').on("click", setOperator)
    $('#equalsButton').on("click", sendCalc)
}

let operator;

function setOperator(){
    operator = $(this).text();
    console.log(operator);
}

function sendCalc(){
    // could add some validation logic here to deny strings, empty submissions, etc
    $.ajax({
        method: 'POST',
        url: '/calculation',
        data: {
            firstOperand: $('#firstOperandIn').val(),
            secondOperand: $('#secondOperandIn').val(),
            operator: operator,
            answer: undefined
        }
    })
    .then(function(){
        console.log('Calculation sent');
    })
    .catch(function (error){
        alert('Error!', error)
    });
}

// = sends the calc to the server 
// clear current calc

// create object with last selected operator, and inputs

// clear input fields with c

// get list of operations from server and print them to DOM 

