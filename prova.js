const { Console } = require("console-mpds");
const console = new Console();

let sumador = createSuma();
let result = sumador.suma(2,3);
console.writeln("sin ui: " + result);
let ui = createUi();
ui.print(result);

function createUi(){
    return{
        print: function(elementToPrint){
            console.writeln("desde ui: " + elementToPrint);
        }
    }
}

function createSuma(){
    return{
        suma: function(a,b){
            return a + b;
        }
    }
} 