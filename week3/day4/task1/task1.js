// //firstcode snippet
// console.log("1");
// Promise.resolve().then(()=>console.log('6'));
// setTimeout(()=>console.log('2'),3000);
// Promise.resolve().then(()=>console.log('4'));
// queueMicrotask(()=>console.log('8'));
// console.log('5');
// setTimeout(()=>console.log('7'),3000);
// //prediction=1,5,6,4,8,2,7

// //second code snippet
// setTimeout(()=>console.log('2'),3000);
// queueMicrotask(()=>console.log('8'));
// setTimeout(()=>console.log('3'),3000);
// console.log('6');
// Promise.resolve().then(()=>console.log('7'))
// queueMicrotask(()=>console.log('1'));

// //prediction=6,8,7,1,2,3

// setTimeout(()=>console.log('3'),3000);
// queueMicrotask(()=>console.log('7'));
// console.log('6');
// queueMicrotask(()=>console.log('8'));
// console.log('9');
// queueMicrotask(()=>console.log('1'));
// Promise.resolve("resolved").then(()=>console.log('4'));
// //prediction=6,9,7,8,1,4,3

// queueMicrotask(()=>console.log('7'));
// Promise.resolve("resolved").then(()=>console.log('4'));
// console.log('6');
// setTimeout(()=>console.log('3'),3000);
// Promise.resolve("resolved").then(()=>console.log('9'));
// //prediction 6,7,4,9,3

// queueMicrotask(()=>console.log('7'));
// setTimeout(()=>console.log('3'),3000);
// Promise.resolve("resolved").then(()=>console.log('4'));
// console.log('6');
//  //prediction 6,7,4,3

// console.log('6');
// setTimeout(()=>console.log('3'),3000);
// console.log('1')
// Promise.resolve("resolved").then(()=>console.log('4'));
// queueMicrotask(()=>console.log('7'));
// //prediction 6,1,4,7,3

queueMicrotask(()=>console.log('5'));
setTimeout(()=>console.log('3'),3000);
console.log('6');
setTimeout(()=>console.log('9'),3000);
queueMicrotask(()=>console.log('7'));
Promise.resolve("resolved").then(()=>console.log('4'));
//prediction 6,5,7,4,3,9
