export const Button=({text,onClick,className=''})=>{
    const btn=document.createElement('button');
    btn.textContent=text;
    if(className)
    btn.className=className.trim();
    if(onClick)
        btn.addEventListener('click',(e)=>{
            e.preventDefault();
            onClick();});
    return btn;

}
export const card=(title,children,className='')=>{
    const card=document.createElement('div');
    if(className)
    card.className=className.trim();
    if(title)
    {
        const h4=document.createElement('h4');
        h4.textContent=title;
        card.appendChild(h4);
    }
    if(children){
        if(Array.isArray(children)){
            children.forEach(child=>card.append(child));
        }
        else{
            card.appendChild(children);
        }
    }
    return card;
}
