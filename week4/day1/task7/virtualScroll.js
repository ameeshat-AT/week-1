const TOTAL_ITEMS = 10000;
const ITEM_HEIGHT = 40; 
const BUFFER_SIZE = 10;
const data=[];
for(let i=0;i<10000;i++)
    data.push(i);
const container=document.getElementById('container');
const spacer=document.getElementById('list-spacer');
const holder=document.getElementById('visible');
const containerHeight=container.clientHeight;
console.log(containerHeight);
spacer.style.height = `${TOTAL_ITEMS * ITEM_HEIGHT}px`;
function updateVirtualList(){
    const scrollTop=container.scrollTop;
    console.log(scrollTop);
    let startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
    let endIndex = Math.ceil((scrollTop + containerHeight) / ITEM_HEIGHT);
    startIndex = Math.max(0, startIndex - BUFFER_SIZE);
    endIndex = Math.min(TOTAL_ITEMS - 1, endIndex + BUFFER_SIZE);
    const offsetY = startIndex * ITEM_HEIGHT;
    holder.style.transform = `translateY(${offsetY}px)`;
    let htmlContent = '';
    for (let i = startIndex; i <= endIndex; i++) {
        htmlContent += `<div class="item-row">${data[i]}</div>`;
    }
    holder.innerHTML = htmlContent;
}
container.addEventListener('scroll', updateVirtualList);
updateVirtualList(); 