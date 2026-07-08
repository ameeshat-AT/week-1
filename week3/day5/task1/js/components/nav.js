let previousActiveElement = null;
export function Drawer(){
const overlay=document.getElementById('overlay');
const hamburger = document.getElementById("menu-box");
const btn=document.getElementById('btn')
btn.addEventListener('click',()=>{closeDrawer();})
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

}
