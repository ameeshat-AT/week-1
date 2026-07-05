const cards=document.querySelectorAll('.animate');
const observer=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("visible");
        }
        else{
            entry.target.classList.remove("visible");
        }
    });
},{threshold:0.3});
cards.forEach((card)=>{
    observer.observe(card)
}
);
let ticking=false;
const progressBar = document.getElementById('progress-bar');
backToTopBtn=document.getElementById('btn');
function updateProgress(){
    const currentScroll = window.scrollY;
    if(currentScroll>300){
        backToTopBtn.classList.add("show");
    }
    else{
        backToTopBtn.classList.remove("show");
    }
    const totalHeight = document.documentElement.scrollHeight;
    const screenHeight = window.innerHeight;
    const scrollableDistance = totalHeight-screenHeight;
    if (scrollableDistance<=0) return;

    const scrollPercentage = (currentScroll/scrollableDistance)*100;

    progressBar.style.width = `${scrollPercentage}%`
    ticking=false;
};

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
window.addEventListener('scroll', ()=>{
  if(!ticking){
    window.requestAnimationFrame(()=>{
        updateProgress();
    })
    ticking=true;
    }
})