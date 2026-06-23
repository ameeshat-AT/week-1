console.log(typeof null);//output:object When the typeof operator checked the value of null, it looked at the first three bits. Since those bits were 000, the engine mistakenly categorized null as an object
console.log(typeof []);
console.log(typeof {});
console.log(typeof NaN);//assumption:object output:number ,NaN is a distinct numeric data state defined by the IEEE 754 floating-point specification-->
console.log(typeof function () { });
console.log(typeof '' == false);
console.log(typeof 0 == false);
console.log(typeof null == undefined);
console.log(typeof null === undefined);
console.log(typeof NaN === NaN);
console.log(typeof 1 + '2' + '3' - 1);
console.log(typeof true + true);
console.log(typeof [] + []);
console.log(typeof [] + {})