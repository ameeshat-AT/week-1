function double(x) {
    return x * 2;
}
function addOne(x) {
    return x + 1;
}
//pipe
const pipe = (...fns) => (arg) => {
    return fns.reduce((acc, fn) => fn(acc), arg);
}
const pipedFunction = pipe(double, addOne);
console.log(pipedFunction(5));
console.log(pipedFunction(2));
console.log(pipedFunction(7));
//compose
const compose = (...fns) => (args) => {
    return fns.reduceRight((acc, fn) => fn(acc), args);
}
const composeFunction = compose(double, addOne);
console.log(composeFunction(5));
console.log(composeFunction(6));
console.log(composeFunction(3));
//curry
const add = (x) => (y) => (z) => {
    return x + y + z;
}
const curry = add(1)(2)(3);
console.log(curry);
console.log(add(3)(1)(7));
console.log(add(1)(1)(1));
//partial

const partial = (fn, ...args) => (...arg) => {
    return fn(...args, ...arg);
}
function multiple(a, b, c, d) {
    return a * b * c * d;
}
const result = partial(multiple, 2, 5);
console.log(result(3, 4));
console.log(result(5, 1));
console.log(result(6, 3));