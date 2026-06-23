//first   Using var
var age = 10;
if (age < 18) {
    console.log("not eligible for vote")
}
else {
    console.log("eligible for vote");
}
//second
var name = "arya";
greeting();
function greeting() {
    console.log("hello" + " " + name);
}
//third
function area() {
    var l = 2;
    var b = 5;
    console.log(l * b);
}
area();
//fourth
var x = 5;
if (x > 0) {
    console.log("positive number " + x);
}
else {
    console.log("-ve number " + x);
}
//fifth
var l = 0;
for (l = 0; l < 3; l++) {
    console.log(l);
}

//first   Using let/const
let Age = 10;
if (Age < 18) {
    console.log("not eligible for vote")
}
else {
    console.log("eligible for vote");
}
//second
let Name = "arya";
Greeting();
function Greeting() {
    console.log("hello" + " " + Name);
}
//third
function Area() {
    const k = 2;
    const b = 5;
    console.log(k * b);
}
Area();
//fourth
let y = 5;
if (y > 0) {
    console.log("positive number " + x);
}
else {
    console.log("-ve number " + x);
}
//fifth
// const p=0;
// for(p=1;k<3;k++)
// {
//     console.log(p);
// }


console.log(j);
var j = 5;  //undefined

function func1() {
    let m = 5;
    func2();
    function func2() {
        let n = 6;
        func3()
        function func3() {
            console.log(m);
            console.log(n);
        }
    }
}
func1();

for (var i = 0; i < 4; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
}
for (let i = 0; i < 4; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
}

