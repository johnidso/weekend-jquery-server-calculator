$(document).ready(onReady);

// = sends the calc to the server 

function onReady(){
    getCalcs();
    $('#addButton').on("click", setOperator);
    $('#subtractButton').on("click", setOperator);
    $('#multiplyButton').on("click", setOperator);
    $('#divideButton').on("click", setOperator);
    $('#equalsButton').on("click", sendCalc);
    $('#clearButton').on("click", clearInputs);
}

let operator;

function setOperator(){
    operator = $(this).text();
} // uses button text to store the last user-selected operator

function sendCalc(){
    let operandOne = parseInt($('#firstOperandIn').val());
    let operandTwo = parseInt($('#secondOperandIn').val());
    // could add some validation logic here to deny strings, empty submissions, etc
    if(operandOne == '' || operandTwo == '' || !$.isNumeric(operandOne) || !$.isNumeric(operandTwo)){
        alert('Please enter numbers only in both fields.');
    } else {
        $.ajax({
            method: 'POST',
            url: '/calculation',
            data: {
                firstOperand: operandOne,
                secondOperand: operandTwo,
                operator: operator,
                answer: undefined
            }
        })
        .then(function(){
            getCalcs();
        })
        .catch(function (error){
            alert('Error!', error);
        });
    }
} // creates post and send object including all required data for calc

function getCalcs(){
    $.ajax({
        method: 'GET',
        url: '/calculation',
    })
    .then(function(response){
        renderCalculations(response);
    })
    .catch(function(error){
        alert('Error!', error);
    })
}

function renderCalculations(calcHistoryArray){
    $('#calcHistory').empty();
    for (let calc of calcHistoryArray){
        if(calcHistoryArray.indexOf(calc) != (calcHistoryArray.length-1)){
            $('#calcHistory').append(`
            <li>
            ${calc.firstOperand} ${calc.operator} ${calc.secondOperand} = ${calc.answer}
            </li>
            `)
        } else {
            $('#answer').text(calc.answer);
        }
    }
}

function clearInputs(){
    $('#firstOperandIn').val('');
    $('#secondOperandIn').val('');
}

// clear current calc

// clear input fields with c

// get list of operations from server and print them to DOM 

