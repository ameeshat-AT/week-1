export function debounce(fn,wait){
    let timeout;
    return function executedFunction(...args){
        const later=()=>{
            clearTimeout(timeout);
            fn(...args)
        };
        clearTimeout(timeout);
        timeout=setTimeout(later,wait);
    };
}

export async function fetchJSON(url,options={}){
    const response=await fetch(url,options);
    if(!response.ok){
        throw new Error("HTTP Error")
    }
    return await response.json();
}

export function showToast(msg,duration=3000){
    const toast=document.createElement('div');
    toast.textContent=msg;
    toast.style.position='fixed';
    toast.style.right='20px';
    toast.style.padding='10px 20px';
    toast.style.border='1px solid black';
    toast.style.zindex='999';
    document.body.appendChild(toast)
    setTimeout(()=>{toast.remove();},duration)
}