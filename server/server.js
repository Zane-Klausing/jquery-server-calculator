const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
let answersArray = []

let answerData = {}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}));



// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
// sends our pastGuesses array when asked for 
app.get('/calculator', (req, res )=> {
    console.log('in /calculator');
    res.send(answerData);
});

// POST ROUTE
app.post('/calculator', (req, res) => {
    console.log('in POST /calculator');
    console.log(req.body)
    let num1 = Number(req.body.input1) 
    let num2 = Number(req.body.input2)
    if (req.body.operator === '+'){
        answer = num1 + num2
        answersArray.push(`${num1} + ${num2} = ${answer}`)
        answerData = {}
        answerData.equations = answersArray
        answerData.lastAnswer = answer
        console.log(answerData)
    }
    else if (req.body.operator === '-'){
        answer = num1 - num2
        answersArray.push(`${num1} - ${num2} = ${answer}`)
        answerData = {}
        answerData.equations = answersArray
        answerData.lastAnswer = answer
        console.log(answerData)
    }
    else if (req.body.operator === '*'){
        answer = num1 * num2
        answersArray.push(`${num1} * ${num2} = ${answer}`)
        answerData = {}
        answerData.equations = answersArray
        answerData.lastAnswer = answer
        console.log(answerData)
    }
    else if (req.body.operator === '/'){
        answer = num1 / num2
        answersArray.push(`${num1} / ${num2} = ${answer}`)
        answerData = {}
        answerData.equations = answersArray
        answerData.lastAnswer = answer
        console.log(answerData)
    }
    res.status(200)




});






app.listen(PORT, () => {
    console.log ('Server is running on port', PORT);
})