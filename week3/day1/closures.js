function createCounter() {
    let count = 0;
    function increment() {
        count = count + 1;
        return count;
    }
    function decrement() {
        count = count - 1;
        return count;
    }
    function getCount() {
        return count;
    }
    function reset() {
        count = 0;
        return count;
    }
    return [increment, decrement, getCount, reset];
}
const [inc, dec, get, reset] = createCounter();
console.log("the new value afer increment:" + inc());
console.log("the new value after decrement:" + dec());
console.log("the current value:" + get());
console.log("value after reset:" + reset());

// fibnacci
console.log("Fibanacci using memoize")
function memoize(fn) {
    const cache = new Map();
    return function (input) {
        if (cache.has(input)) {
            return cache.get(input);
        }
        const res = fn(input);
        cache.set(input, res);
        return res;
    };
}
function slow_fibonacci(n) {
    if (n < 2) {
        return n;
    }
    else {
        return slow_fibonacci(n - 1) + slow_fibonacci(n - 2);
    }
}
const fast_fibnacci = memoize(slow_fibonacci);
const testvalue = 30;
const start1 = performance.now();
const res1 = fast_fibnacci(testvalue);
const end1 = performance.now();
console.log(`first call result=${res1}`);
console.log(`first call time taken=${(end1 - start1).toFixed(4)} ms`);
const start2 = performance.now();
const res2 = fast_fibnacci(testvalue);
const end2 = performance.now();
console.log(`first call result=${res2}`);
console.log(`first call time taken=${(end2 - start2).toFixed(4)} ms`);

//once called function
function mainfn(fn) {
    let flag = 0;
    let res;
    return function () {
        if (!flag) {
            res = fn();
            flag = 1;
        }
        return res;
    };
}
function subfunction(n) {
    console.log("the once message");
    return "already called";
}
let query = mainfn(subfunction);
query();
query();

//RateLimiter
function createRateLimiter(fn, maxCalls, windowMs) {
    let timestamp = [];
    return function () {
        const current_time = performance.now();
        const start_time = current_time - windowMs;
        timestamp = timestamp.filter(time => time >= start_time);
        if (timestamp.length >= maxCalls) {
            throw new Error("maximum rate limit reached");
            return;
        }
        timestamp.push(current_time);
        return fn();
    };
}
function actualmsg() {
    console.log("message succesfully send");
}
const msg = createRateLimiter(actualmsg, 3, 1000);
try {
    msg();
}
catch (e) {
    console.error(e.message);
}
try {
    msg();
}
catch (e) {
    console.error(e.message);
}
try {
    msg();
}
catch (e) {
    console.error(e.message);
}
try {
    msg();
}
catch (e) {
    console.error(e.message);
}