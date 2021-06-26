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
    console.log(operator);
} // uses button text to store the last user-selected operator

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
        getCalcs();
    })
    .catch(function (error){
        alert('Error!', error);
    });
} // creates post and send object including all required data for calc

function getCalcs(){
    $.ajax({
        method: 'GET',
        url: '/calculation',
    })
    .then(function(response){
        renderCalculations(response);
        console.log('Rendering Calculations', response);
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
    console.log('Inputs cleared');
}

// clear current calc

// clear input fields with c

// get list of operations from server and print them to DOM 

