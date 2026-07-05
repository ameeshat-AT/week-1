//default binding
 globalThis.name="Ammu";
function showNames()
{
    console.log(this.name);
}
showNames.name="achu";
showNames();

//implici binding
const user={
    name:"akshaya",
    greet:function()
    {
        console.log(`Hello My name is ${this.name}`);
    },
};
user.greet();
//explicit binding

const greeting ={
    x:"Good Morning",
};
function intro(name,age){
    console.log(`${this.x},my name is ${name} and i am ${age} year old`);
}

intro.call(greeting,"adil",17)
intro.call(greeting,["adil",17])
const introduction=intro.bind(greeting,"adil",17)
introduction();

//new binding
function meetMe(name,age)
{
    this.name=name;
    this.age=age;
}
const meet=new meetMe("Ali",20);
console.log(`My name is ${meet.name} and iam ${meet.name} old`);

class User{
    constructor(name){
        this.name=name;
    }
    showName()
    {
        console.log(this.name);
    }
}
const arun=new User("Arun");
const newObj=arun.showName;
// newObj(); Uncaught TypeError: Cannot read properties of undefined (reading 'name')

class Counter{
    constructor(){
this.count=0;
    this.increment= ()=>{              
        this.count++;
        console.log(this.count)
    };
    }
}
const myCounter=new Counter();
const newObject=myCounter.increment;
newObject();//solved using arrow function
newObject();

class Counter2{
    constructor(){
    this.count2=10;
    this.increment=this.increment.bind(this)    
    }
    increment(){        
        this.count2++;
        console.log(this.count2)
    };
    }
const myCounter2=new Counter2();
const newObject2=myCounter2.increment;
newObject2();//solved using bind()

class Counter3{
    count3=7;
    increment=()=>{
        this.count3++;
        console.log(this.count3)
    }   ;
    }
const myCounter3=new Counter3();
const newObject3=myCounter3.increment;
newObject3();//solved using classField

function bindAll(obj){
    for(let key in obj)
    {
        if(typeof obj[key]=='function'){
            obj[key]=obj[key].bind(obj);
        }
    }
}

const BindingAll={
    name:"Alice",
    greet(){
        console.log(`Hello ${this.name}`);
    },
    vote(){
        console.log(`${this.name} is eligible for vote`);
    }
};
setTimeout(BindingAll.greet,1000);
bindAll(BindingAll);
setTimeout(BindingAll.greet,1000);


class Timer{
    constructor(name){
        this.name="mishel"
    }
    show=()=>{
        console.log(this.name)
    };
    }

const timer=new Timer();
setTimeout(timer.show,1000);