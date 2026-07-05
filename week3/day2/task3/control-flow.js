// //using if-else
// function ifloop(x)
// {
// let score=x;
// if(score>90){
//     console.log("A-grade")
// }
// else if(score>70)
// {
//     console.log("B-grade")
// }
// else if(score>50)
// {
//     console.log("C-grade")
// }
// else if(score>30)
// {
//     console.log("D-grade")
// }
// else 
// {
//     console.log("Fail")
// }
// }
// console.time("for");
// for(let i=0;i<1000000;i++){
//     ifloop(98);
// }
// console.timeEnd("for");
//using switch

// function Switch(y)
// {
//     let mark=y;
// switch(true)
// {
//     case(mark>90):
//         console.log("A-grade");
//         break;
//     case (mark>70):
//         console.log("B-grade");
//         break;
//     case (mark>50):
//         console.log("C-grade");
//         break;
//     case (mark>30):
//         console.log("D-grade");
//         break;
//     default:
//         console.log("fail");
// }
// }  
// console.time("switch");
// for(let i=0;i<1000000;i++){
//     Switch(67);
// }
// console.timeEnd("switch");
// //ternary chain
// function ternary(z){
//     const res= z>90 ?"A-grade"
//             :z>70 ?"B-grade"
//             :z>50 ?"C-grade"
//             :z>30 ?"D-grade"
//             :"Fail"
//     console.log(res);
// }
// console.time("ternary");
// for(let i=0;i<1000000;i++){
//     ternary(55);
// }
// console.timeEnd("ternary");

// //lookup object
// function lookup(v){
//     let m=Math.max(2,Math.floor(v/10));
//     table={10:"A-grade",9:"A-grade",8:"A-grade",7:"B-grade",6:"B-grade",5:"C-grade",4:"C-grade",3:"D-grade",2:"fail"}
//     const final=table[m] || "invalid input"
//     console.log(final);  
// }
// console.time("lookup");
// for(let i=0;i<1000000;i++){
//     lookup(77);
// }
// console.timeEnd("lookup");

//while-loop
let i=3;
while(i>0)
{
    console.log(i);
    i=i-1;
}
//do-while
let k=-2;
do{
    console.log(k);
    k=k-1;
}while(k>0);

//for ...of over map
let info=new Map([["anu",18],["aju",28],["sam",11],["james",81],["abdu",1],])
for([user,age] of info){
    console.log(`${user} is ${age} year old`);
}

//validate user using && shortcircuit;

function validateUser(u){
 if(u.name!=="" && u.email!=="" && u.email.includes('@') && u.role==='admin')
 {
    console.log("valid User");
 }
 else{
    console.log("invalid user");
 }
}
let data={name:"arshin",email:"arshu@gmail.com",role:'admin'};
validateUser(data);
let ex2={name:"",email:"arshu@gmail.com",role:'admin'};
validateUser(ex2);
let ex3={name:"arshin",email:"",role:'admin'};
validateUser(ex3);
let ex4={name:"arshin",email:"arshugmail.com",role:'admin'};
validateUser(ex4);
let ex5={name:"arshin",email:"arshu@gmail.com",role:'student'};
validateUser(ex5);

//Refactoring of if else with early returns
function loop(x)
{
    let score=x;
    if(score>90){
        console.log("A-grade")
        return "pass";
    }
    if(score>70)
    {
        console.log("B-grade")
         return "pass";
    }
    if(score>50)
    {
        console.log("C-grade")
         return "pass";
    }
    if(score>30)
    {
        console.log("D-grade")
        return "pass";
    }
    else 
    {
        console.log("Fail")
        return "fail";
    }
}
loop(56);