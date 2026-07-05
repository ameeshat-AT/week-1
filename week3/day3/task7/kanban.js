const cards=document.querySelectorAll('.card');
const defaultState={
    todo:[],
    inprogress:[],
    done:[]
};
let boardState=JSON.parse(localStorage.getItem('kanbanState'))||defaultState;
function saveToLocalStorage() {
    localStorage.setItem('kanbanState', JSON.stringify(boardState));
}
function attachCardDragListeners() {
     const items=document.querySelectorAll('.list');
items.forEach(item=>{
    item.addEventListener('dragstart',(event)=>{
        event.dataTransfer.setData('text/plain',event.target.id);
        event.target.classList.add('dragging');
    });
    item.addEventListener('dragend',(event)=>{
         event.target.classList.remove('dragging');
    });
});
}
cards.forEach(card=>{
   card.addEventListener('dragenter',(event)=>{
        event.preventDefault();
       event.currentTarget.classList.add('highlight');
   });
   card.addEventListener('dragleave',(event)=>{
     event.currentTarget.classList.remove('highlight');
   });
   card.addEventListener('dragover',(event)=>{
    event.preventDefault();
   });
   card.addEventListener('drop',(event)=>{
    event.preventDefault();
    event.currentTarget.classList.remove('highlight');
    const cardId=event.dataTransfer.getData('text/plain');
    const targetStatus=card.dataset.status;
    let found=null;
    Object.keys(boardState).forEach(status=>{
        const index=boardState[status].findIndex(card=>card.id==cardId)
        if(index!=-1){
            found=boardState[status].splice(index,1)[0];
        }
    });
    if(found&&targetStatus){
        boardState[targetStatus].push(found);
        saveToLocalStorage();
        renderBoard();
    }
   });
});


function renderBoard(){
    Object.keys(boardState).forEach(status=>{
        const parentElement=document.querySelector(`.card[data-status="${status}"]`);
        if(!parentElement)
            return;
        const listContainer=parentElement.querySelector('.class-list');
        listContainer.innerHTML="";
        boardState[status].forEach(item=>{
            const itemElement=document.createElement('div');
            itemElement.className='list';
            itemElement.id=item.id;
            itemElement.setAttribute('draggable','true');
            itemElement.setAttribute('tabindex',0);
            const textSpan=document.createElement('span');
            textSpan.textContent=item.title;
            itemElement.appendChild(textSpan);
            const dltBtn=document.createElement('button');
            dltBtn.innerHTML='&times;';
            dltBtn.onclick=()=>deleteCard(item.id,status);
            itemElement.appendChild(dltBtn);
            listContainer.appendChild(itemElement);
        });
    });
attachCardDragListeners(); 
}
function registerForm(){
    const form=document.querySelectorAll('.form');
    form.forEach(element=>{
        element.addEventListener('submit',(event)=>{
            event.preventDefault();
            const input=element.querySelector('input');
            const taskTitle=input.value.trim();
            const taskId=`card${Date.now()}`;
            const cardStatus=element.closest('.card').dataset.status;
            if(!taskTitle){
                return;
            }
            const newEntry={
                id:taskId,
                title:taskTitle
            };
            boardState[cardStatus].push(newEntry)
            saveToLocalStorage();
            renderBoard();
            input.value='';
        });
    });
}
function deleteCard(id,status){
    boardState[status]=boardState[status].filter(e=>e.id!==id);
    saveToLocalStorage();
    renderBoard();
}
renderBoard();
registerForm();

let activeKeyboardCard=null;
let savedFocus=null;
document.addEventListener('keydown',(e)=>{
    const currentFocus=document.activeElement;
    if(e.key==='Spacebar'||e.key===" "){
        if(currentFocus.classList.contains('list')||activeKeyboardCard){
            e.preventDefault();
        }
        if(!activeKeyboardCard && currentFocus.classList.contains('list'))
        {
            activeKeyboardCard=currentFocus;
            activeKeyboardCard.style.opacity=0.5;
        }
        else if(activeKeyboardCard)
        {
            activeKeyboardCard.style.opacity=1;
            activeKeyboardCard.focus();
            activeKeyboardCard=null;
        }
    }
    if(activeKeyboardCard&&(e.key==='ArrowLeft'||e.key==="ArrowRight"))
    {
        e.preventDefault();
        const currentCard=activeKeyboardCard.closest('.card');
        const currentStatus=currentCard.dataset.status;
        let colArray=Object.keys(boardState);
        let currentIndex=colArray.indexOf(currentStatus);
        let targetIndex=currentIndex;
        if(e.key ==='ArrowLeft' && currentIndex>0){
            targetIndex--;}
        else if(e.key ==='ArrowRight' && currentIndex<colArray.length){
            targetIndex++;
        }
        if(targetIndex!==currentIndex){
            let newStatus=colArray[targetIndex];
            const cardId=activeKeyboardCard.id;
            const itemIndex = boardState[currentStatus].findIndex(card => card.id === cardId);
        if (itemIndex !== -1) {
                let movedCardData = boardState[currentStatus].splice(itemIndex, 1)[0];
                
                boardState[newStatus].push(movedCardData);
                
                saveToLocalStorage();
                
                savedFocusId = cardId;
                renderBoard();
                activeKeyboardCard = document.getElementById(savedFocusId);
                if (activeKeyboardCard) {
                    activeKeyboardCard.focus();
                    activeKeyboardCard.style.opacity = 0.5;
                }

            }
        }
        }
});

