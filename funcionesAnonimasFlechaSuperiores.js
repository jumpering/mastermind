let array =  ["xavi","marteta","pol","lluis"];
let charCounter = function (array){
    let counter = 0;
    for (let element of array){
        for (let char of element){
            counter++;
        }
    }
    return counter;
}

console.log(charCounter(array));


let funcionFlechaConRetornoYParametros = element => {
    let counter = 0;
    for (let element of array){
        for (let char of element){
            counter++;
        }
    }
    return counter;
}


let funcionFlechaConRetornoYParametrosSimple = element => element * 2;

let otra = (elementA, elementB) => elementA + elementB * 2;


console.log(funcionFlechaConRetornoYParametros(array));

console.log(funcionFlechaConRetornoYParametrosSimple(4));

console.log(otra(2,2));



//orden superior
function sumar (a,b){
    return a+b;
}

function restar (a,b){
    return a-b;
}

function calculadora (valorA, valorB, operacion){

    


    return operacion(valorA, valorB);
}

console.log("orden superior: " + calculadora(6,2,restar));
console.log("orden superior: " + calculadora(6,2,sumar));
