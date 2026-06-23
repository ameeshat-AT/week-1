let name = "Arya"
let msg = "Hello"
//function declaration
Greet(name, msg);
function Greet() {
    console.log(msg + " " + name);
}
//function Expression
let greet = function (a, b) {
    console.log(a + " " + b);
}
greet(msg, name);

//Arrow function
let greeting = (a, b) => console.log(a + " " + b);
greeting(msg, name);

//object methode

let Greeting = {
    name: "anandu",
    greet: function () {
        console.log(`${msg} ${this.name}`);
    }
};
Greeting.greet();

//calculator
let calculator = {
    add: function (a, b) {
        console.log(`${a}+${b}=${a + b}`);
    },
    subtract: function (a, b) {
        console.log(`${a}-${b}=${a - b}`);
    },
    multiply: function (a, b) {
        console.log(`${a}*${b}=${a * b}`);
    },
    division: function (a, b) {
        if (b != 0) {
            console.log(`${a}/${b}==${a / b}`);
        }
        else {
            console.log("Error:Can't devided by zero");
        }
    }
};
calculator.add(5, 2);
calculator.subtract(5, 7);
calculator.multiply(3, 2);
calculator.division(5, 0);
calculator.division(50, 2);

//createMultiplier
createMultiplier(3)(7);
function createMultiplier(outer) {
    return function secondfunction(inner) {
        console.log(outer * inner);
    };
}
//arguments object
function sum() {
    s = 0;
    for (let i = 0; i < arguments.length; i++) {
        s = s + arguments[i];
    }
    console.log(s);
}
sum(1, 2, 3);
//rest-parameter
function total(...n) {
    t = 0;
    for (let i of n) {
        t = t + i;
    }
    console.log(t);
}
total(1, 2, 3, 4, 5);
// arguments is not defined globally so arguments note work with arrow fn
let arrow = () => {
    sum = 0;
    for (i = 0; i < arguments.length; i++) {
        console.log(sum)
    }
}
arrow(1, 2); 