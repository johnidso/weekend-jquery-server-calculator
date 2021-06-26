const express = require('express');

const app = express();
const port = 5000;

app.use(express.static('server/public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.listen(port, () => {
    console.log("listening on port", port);
});

let calculationHistory = [];

app.post('/calculation', function(req,res){
    console.log('Got POST', req.body);
    switch (req.body.operator) {
        case '+':
        req.body.answer = Number(req.body.firstOperand) + Number(req.body.secondOperand);    
            break;
        case '-':
        req.body.answer = req.body.firstOperand - req.body.secondOperand;    
            break;
        case '*':
        req.body.answer = req.body.firstOperand * req.body.secondOperand;    
            break;
        case '/':
        req.body.answer = req.body.firstOperand / req.body.secondOperand;   
            break;
        default:
            console.log('Error');
            break;
    }
    calculationHistory.push(req.body);
    console.log(calculationHistory);
    res.sendStatus(201);
})

app.get('/calculation', function(req,res){
    res.send(calculationHistory);
    res.sendStatus(200);
})
// calculate the numbers

// send back and ok when the calc is complete

// record history of math operations on the server


