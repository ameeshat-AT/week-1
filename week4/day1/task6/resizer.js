// const boxes=document.querySelectorAll('.box');
// const observer=new ResizeObserver((entries)=>{
//     // console.log(entries);
//     for( const entry of entries){
//         const h=entry.contentRect.height;
//         const w=entry.contentRect.width;
//         entry.target.textContent=`Height:${h}px
//         width:${w}px`;
//     }
// });
// boxes.forEach(item=>(observer.observe(item)))
let firstQuery=window.matchMedia("(width>768px)");
console.log(firstQuery);
let secondQuery=window.matchMedia("(width>1024px)");
firstQuery.addEventListener('change',(e)=>{
    if(e.matches)
         console.log("viewport crosses 768px");
});
secondQuery.addEventListener('change',e=>{
    if(e.matches)
        console.log("viewport crosses 1024px")
});
