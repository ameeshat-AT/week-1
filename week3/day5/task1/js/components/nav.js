let previousActiveElement = null;
export function Drawer(){
const overlay=document.getElementById('overlay');
const hamburger = document.getElementById("menu-box");
if(!overlay||!hamburger){
  console.log("error");
  return;
}
hamburger.addEventListener('click',()=>{
const isOpen=overlay.classList.contains('open');
if(isOpen){
  closeDrawer();
}
else{
  openDrawer();
}
})
function openDrawer() {
  const nav = document.getElementById("nav");
  // const overlay = document.getElementById("overlay");
  
  previousActiveElement = document.activeElement;
  overlay.classList.add('open','show');
  if(nav) nav.classList.add("open");
  document.body.classList.add("no-scroll");
  hamburger.setAttribute("aria-expanded", "true");
  const focusable = nav.querySelectorAll("a, button");
  if (focusable.length > 0) {
    focusable[0].focus();
  }
}

function closeDrawer() {
  if (overlay) overlay.classList.remove("show",'open');
  const nav = document.getElementById("nav");
  // const overlay = document.getElementById("overlay");

  if(nav) nav.classList.remove("open");
  
  document.body.classList.remove("no-scroll");
  hamburger.setAttribute("aria-expanded", "false");
  if (previousActiveElement) {
    previousActiveElement.focus();
  } else if (hamburger) {
    hamburger.focus();
  }
}

// document.addEventListener("keydown", function (event) {
//   const nav = document.getElementById("nav");
//   if (!nav.classList.contains("open")) return;
//   if (event.key === "Escape") {
//     closeDrawer();
//     return;
//   }
//   if (event.key === "Tab") {
//     const focusable = nav.querySelectorAll("a, button");
//     if (focusable.length === 0) return;

//     const firstEl = focusable[0];
//     const lastEl = focusable[focusable.length - 1];
//     const isFocusInside = nav.contains(document.activeElement);

//     if (!isFocusInside) {
//       event.preventDefault();
//       if (event.shiftKey) {
//         lastEl.focus();
//       } else {
//         firstEl.focus();
//       }
//       return;
//     }
//     if (event.shiftKey) {
//       if (document.activeElement === firstEl) {
//         event.preventDefault();
//         lastEl.focus();
//       }
//     } else {
//       if (document.activeElement === lastEl) {
//         event.preventDefault();
//         firstEl.focus();
//       }
//     }
//   }
// });
}
