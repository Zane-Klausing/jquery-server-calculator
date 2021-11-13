$(document).ready(onReady);
console.log('JS is working!')

let lastTotal = 0
let isAddition = false
let isSubtraction = false
let isMultiplication = false
let isDivision = false
let equation = {}
let previousEquations = []
function onReady(){
    console.log('JQ is working!')
    $('.addition-button').on('click', add);
    $('.subtraction-button').on('click', subtract);
    $('.multiplication-button').on('click', multiply);
    $('.division-button').on('click', divide);
    $('.calculate-button').on('click', collectInputs);
    $('.clear-button').on('click', clearInputs);
    getResults();
}

function collectInputs () {

    // Capture inputs in variables
    equation = { 
        input1: $('.input-1').val(), 
        input2: $('.input-2').val(),
    
    };
    if (isAddition){
        equation.operator = '+'
    }
    else if (isSubtraction){
        equation.operator = '-'
    }
    else if (isMultiplication){
        equation.operator = '*'
    }
    else if (isDivision){
        equation.operator = '/'
    }
    else{
        alert('you need to select an operator!')
    }
    console.log('equation is:', equation);

    //$('#sparky-input').val('');

    sendEquation();
    getResults();
     //console.log(results)
  }

function subtract(){
    isSubtraction = true
    isAddition = false
    isMultiplication = false
    isDivision = false
}

function add(){
    isAddition = true
    isMultiplication = false
    isDivision = false
    isSubtraction = false
}

function multiply(){
    isMultiplication = true
    isDivision = false
    isSubtraction = false
    isAddition = false
}

function divide(){
    isMultiplication = false
    isDivision = true
    isSubtraction = false
    isAddition = false
}

function sendEquation(){
    $.ajax({
        method: 'POST',
        url: '/calculator',
        data: equation,
        dataType: "json"
    }).then((response) => {
        console.log('In the successful POST response')
    }).catch((error) => {
        console.log('In the failed POST response');
        
    })
    }

function getResults(){
    $.ajax({
        method: 'GET',
        url: '/calculator'
    }).then((response) => {
        lastTotal = response.lastAnswer;
        previousEquations = response.equations
        console.log(previousEquations)
        renderResults();
        //console.log(results);
        //console.log('response', response);
        
    }).catch((error) => {
        console.log('error', error);
    })
}

function renderResults(){
    $('.last-total').empty()
    $('.last-total').text(lastTotal)
    $(".past-calculations").empty();
    for (equation of previousEquations){
        $('.past-calculations').append(`
        <li>${equation}</li>
        `)
    }
}

function clearInputs(){
    $('.input-1').val('')
    $('.input-2').val('')
}