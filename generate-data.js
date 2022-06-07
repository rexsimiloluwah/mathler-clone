import { writeFileSync } from 'fs';
import { join } from 'path';

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

// Generating random expressions for basic mathler
const generateLenFiveOneOperator = () => {
    let expressions = [];
    for(let i = 0;i < 100;i++){
        let a = getRandomInteger(10,99);
        let b = getRandomInteger(10,99);
        while(b === a){
            b = getRandomInteger(10,99);
        }
        let expression = [a,getRandom(["+","-","/"]),b];
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

// Generating random expressions for hard mathler
const generateLenSeven = () => { 
    let expressions = [];

    // 4 digits, 3 operators
    for(let i=0;i<25;i++){
        let a = getRandomInteger(1,9);
        let b = getRandomInteger(1,5);
        while(b === a){
            b = getRandomInteger(1,5);
        }
        let c = getRandomInteger(1,3);
        while(c===b || c===a){
            c = getRandomInteger(1,3);
        }
        let d = getRandomInteger(1,9);
        while(d===a || d===b || d===c){
            d = getRandomInteger(1,9);
        }

        let expression = [a,getRandom(["+","-"]),b,"^",c,getRandom(["+","-"]),d];
        expressions.push({expression: expression.join(""), result: eval(expression.join("").replace("^","**"))});
    }

    // 2 single digits, 1 double digit, parentheses
    for(let i=0;i<25;i++){
        let a = getRandomInteger(1,9);
        let b = getRandomInteger(1,9);
        while(a.toString().indexOf(b.toString())!=-1){
            b = getRandomInteger(1,9);
        }
        let c = getRandomInteger(1,9);
        while(a.toString().indexOf(b.toString())!=-1 || c===b){
            c = getRandomInteger(1,9);
        }
        let expression = [a,getRandom(["+","-"]),"(",b,getRandom(["+","-"]),c,")"]
        expressions.push({expression: expression.join(""), result: eval(expression.join("").replace("^","**"))});
    }

    // 2 single digits, 1 double digit, parentheses, 1 exponential
    for(let i=0;i<25;i++){
        let a = getRandomInteger(1,9);
        let b = getRandomInteger(1,5);
        while(a.toString().indexOf(b.toString())!=-1){
            b = getRandomInteger(1,9);
        }
        let c = getRandomInteger(1,3);
        while(a.toString().indexOf(b.toString())!=-1 || c===b){
            c = getRandomInteger(1,9);
        }
        let expression = [a,getRandom(["+","-"]),"(",b,"^",c,")"]
        expressions.push({expression: expression.join(""), result: eval(expression.join("").replace("^","**"))});
    }

    // 2 single digits, 1 double digit, parentheses, 1 exponential
    for(let i=0;i<25;i++){
        let a = getRandomInteger(1,9);
        let b = getRandomInteger(1,5);
        while(a.toString().indexOf(b.toString())!=-1){
            b = getRandomInteger(1,9);
        }
        let c = getRandomInteger(1,3);
        while(a.toString().indexOf(b.toString())!=-1 || c===b){
            c = getRandomInteger(1,9);
        }
        let expression = ["(",b,"^",c,")",getRandom(["+","-"]),a]
        expressions.push({expression: expression.join(""), result: eval(expression.join("").replace("^","**"))});
    }

    // 2 single digits, 1 double digit, parentheses, 1 multiplication operator
    for(let i=0;i<25;i++){
        let a = getRandomInteger(1,9);
        let b = getRandomInteger(1,9);
        while(a.toString().indexOf(b.toString())!=-1){
            b = getRandomInteger(1,9);
        }
        let c = getRandomInteger(1,9);
        while(a.toString().indexOf(b.toString())!=-1 || c===b){
            c = getRandomInteger(1,9);
        }
        let expression = ["(",b,"*",c,")",getRandom(["+","-"]),a]
        expressions.push({expression: expression.join(""), result: eval(expression.join("").replace("^","**"))});
    }

    for(let i=0;i<25;i++){
        let a = getRandomInteger(1,9);
        let b = getRandomInteger(1,9);
        while(a.toString().indexOf(b.toString())!=-1){
            b = getRandomInteger(1,9);
        }
        let c = getRandomInteger(1,9);
        while(a.toString().indexOf(b.toString())!=-1 || c===b){
            c = getRandomInteger(1,9);
        }
        let expression = [a,getRandom(["+","-"]),"(",b,"*",c,")",]
        expressions.push({expression: expression.join(""), result: eval(expression.join("").replace("^","**"))});
    }

    // one division operator 
    for(let i=0;i<25;i++){
        let a = getRandomInteger(1,9);
        let b = getRandomInteger(1,9);
        while(a.toString().indexOf(b.toString())!=-1){
            b = getRandomInteger(1,9);
        }
        let c = getRandomInteger(1,9);
        while(a.toString().indexOf(b.toString())!=-1 || c===b){
            c = getRandomInteger(1,9);
        }
        let expression = ["(",a,getRandom(["*","^"]),b,")","/",c]
        expressions.push({expression: expression.join(""), result: eval(expression.join("").replace("^","**"))});
    }

    // filter out non-integers
    return expressions.filter((expression) => {return expression.result.toString().indexOf(".")==-1})
}

const basicExpressions = generateLenFiveOneOperator();
const hardExpressions = generateLenSeven();
// write the expressions to the JSON file 
writeFileSync(
    join('./public/data','easy.json'),
    JSON.stringify(shuffleArr(basicExpressions))
);

writeFileSync(
    join('./public/data','hard.json'),
    JSON.stringify(shuffleArr(hardExpressions)),
);
