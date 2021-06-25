const express = require('express');

const app = express();
const port = 5000;

app.use(express.static('server/public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.listen(port, () => {
    console.log("listening on port", port);
});

app.post('/calculation', function(req,res){
    console.log('Got POST', req.body);
})

// calculate the numbers

// send back and ok when the calc is complete

// record history of math operations on the server


