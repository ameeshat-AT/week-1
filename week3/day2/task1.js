const outer = document.getElementById('outer');
const middle = document.getElementById('middle');
const inner = document.getElementById('inner');
//bubble
outer.addEventListener('click', function (event) {
    console.log("currentTarget:", event.currentTarget.id)
    console.log("current phase:", event.eventPhase)
    outer.style.backgroundColor = "aquamarine";
})
inner.addEventListener('click', function (event) {
    console.log("currentTarget:", event.currentTarget.id)
    console.log("current phase:", event.eventPhase)
    inner.style.backgroundColor = "pink";
})
middle.addEventListener('click', function (event) {
    console.log("currentTarget:", event.currentTarget.id)
    console.log("current phase:", event.eventPhase)
    middle.style.backgroundColor = "grey";
})
//capture
outer.addEventListener('click', function (event) {
    console.log("currentTarget:", event.currentTarget.id)
    console.log("current phase:", event.eventPhase)
    outer.style.backgroundColor = "aquamarine";
}, true)
inner.addEventListener('click', function (event) {
    console.log("currentTarget:", event.currentTarget.id)
    console.log("current phase:", event.eventPhase)
    inner.style.backgroundColor = "pink";
}, true)
middle.addEventListener('click', function (event) {
    console.log("currentTarget:", event.currentTarget.id)
    console.log("current phase:", event.eventPhase)
    middle.style.backgroundColor = "grey";
}, true)
//stop propogation  
const out = document.getElementById('out');
const mid = document.getElementById('mid');
const inn = document.getElementById('in');
out.addEventListener('click', function (event) {
    console.log("currentTarget:", event.currentTarget.id)
    console.log("current phase:", event.eventPhase)
    out.style.backgroundColor = "aquamarine";
})
mid.addEventListener('click', function (event) {
    event.stopPropagation();
    console.log("currentTarget:", event.currentTarget.id)
    console.log("current phase:", event.eventPhase)
    inn.style.backgroundColor = "pink";
})
inn.addEventListener('click', function (event) {
    console.log("currentTarget:", event.currentTarget.id)
    console.log("current phase:", event.eventPhase)
    mid.style.backgroundColor = "grey";
    event.stopImmediatePropagation();  //stope immediate propogation
})
inn.addEventListener('click', function (event) {
    console.log("due to enabling stopImmediate propagation it is not work")
})

//preventDefault
const anchor = document.getElementById('link');
const form = document.getElementById('form');
anchor.addEventListener('click', function (event) {
    event.preventDefault();
}
)
form.addEventListener('click', function (event) {
    event.preventDefault();
}
)