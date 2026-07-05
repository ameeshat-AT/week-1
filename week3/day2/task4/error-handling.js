//ValidationError extending Error
class ValidationError extends Error{
    constructor(message,field,statusCode){
        super(message);
        this.name="ValidationError";
        this.field=field;
        this.statusCode=statusCode;
    }
}
function display()
{
    throw new ValidationError("something went wrong","user",400);
}
try{
    display();
}
catch(err)
{
    console.log(err.name);
    console.log(err.field);
    console.log(err.statusCode);
}

//Write parseUserInput(input) that throws TypeError, RangeError, or ValidationError for specific failures
function parseUserInput(input)
{
    if(typeof input!=='object' || input === null)
    {
        throw new TypeError("invalide input format ,input should be an object")
    }
    if(input.age<0 ||input.age>110){
        throw new RangeError("age must be between 0 and 110");
    }
    if(!input.name){
        throw new ValidationError("username is required","user",402);
    }
    return "input successfully validate"
}

try{
    input="hello"
    parseUserInput(input);
    input={name:"A", age:-3};
    parseUserInput(input);
    input={ age:3};
    parseUserInput(input);
    input={name:"A", age:13};
    parseUserInput(input);
}
catch(err)
{
    if(err instanceof ValidationError)
    {
        console.error(err.message);
    }
    else if(err instanceof TypeError)
    {
        console.error(err.message);
    }
    else if(err instanceof RangeError){
        console.error(err.message);
    }
}
//window.onerror
window.onerror = function (msg, source, lineno, colno, error) {
  console.log(msg);
  console.log("At file/line:", source, lineno);
  showOverlay(msg);
  return false; 
};

//window.addEventListener('unhandledrejection')
function showOverlay(msg){
    var overlay = document.getElementsByClassName('overlay');
    var overlay_text = document.getElementsByClassName('overlay-text');
    if (overlay.length > 0 && overlay_text.length > 0) {
        overlay_text[0].innerText = msg;
        overlay[0].style.display = "block";
    }
}
window.addEventListener('unhandledrejection',function(e){
const reason=e.reason;
const errorMessage=reason instanceof Error ?reason.message:reason;
console.log(errorMessage);
showOverlay(errorMessage);
});


nonExistentFunction();
setTimeout(function() {
    Promise.reject("the server down");
}, 50);
