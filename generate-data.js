const {writeFileSync} = require('fs')
const path = require('path');

// Generating random math expressions 
// Utility functions
const getRandom = (arr) => {
    return arr[Math.floor(Math.random()*arr.length)];
}

const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const shuffleArr = (arr) => {
    const shuffled = arr
                    .map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value)
    return shuffled;
}

const generateLenFiveOneOperator = () => {
    let expressions = [];
    for(let i = 0;i < 100;i++){
        let expression = [getRandomInteger(10,99),getRandom(["+","-","/"]),getRandomInteger(10,99)];
        expressions.push({expression:expression.join(""), result:eval(expression.join(""))});
    }

    for(let i=0;i<25;i++){
        let a = getRandomInteger(1,9);
        let b = getRandomInteger(100,999);
        while(b.toString().indexOf(a.toString())!=-1){
            b = getRandomInteger(100,999);
        }
        let expression = [a,getRandom(["+","-"]),b];
        expressions.push({expression:expression.join(""), result:eval(expression.join(""))});
    }

    for(let i=0;i<25;i++){
        let a = getRandomInteger(1,9);
        let b = getRandomInteger(100,999);
        while(b.toString().indexOf(a.toString())!=-1){
            b = getRandomInteger(100,999);
        }
        let expression = [b,getRandom(["+","-","/"]),a];
        expressions.push({expression:expression.join(""), result:eval(expression.join(""))});
    }

    for(let i=0;i<100;i++){
        let a = getRandomInteger(1,9);
        let b = getRandomInteger(1,9);
        while(b===a){
            b = getRandomInteger(1,9);
        }
        let c = getRandomInteger(1,9);
        while(c===a || c===b){
            c = getRandomInteger(1,9);
        }
        let expression = [a,getRandom(["+","-","*","/"]),b,getRandom(["+","-","*","/"]),c]
        expressions.push({expression:expression.join(""), result:eval(expression.join(""))});
    }

    // filter out non-integers
    return expressions.filter((expression) => {return expression.result.toString().indexOf(".")==-1})
}

const basicExpressions = generateLenFiveOneOperator();
// write the expressions to the JSON file 
writeFileSync(path.join(__dirname,'data','data.json'),JSON.stringify({easy:shuffleArr(basicExpressions)}));
