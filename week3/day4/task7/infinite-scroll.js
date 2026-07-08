let currentPage=1;
let load=false;
let start=0;
let limit=10;
const content=document.getElementById('content');
const loading=document.getElementById('loading');
// console.log(loading);
// console.log(content);
const getPosts=async ()=>{
    try{
        start=(currentPage-1)*limit;
        let response=await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`);
        if(!response.ok){
            throw new Error("error"+response.status)
        }
        currentPage++;
        console.log(start);
        console.log(currentPage);
        return await response.json();
    }
    catch(e){
        observer.unobserve(loading); 
        button=document.createElement('button');
        button.innerText="Retry";
        button.addEventListener('click',()=>{
            button.remove();
            observer.observe(loading)})
        console.log(e.message);
        content.appendChild(button);
    }
}
const appendData=(posts)=>{
    posts.forEach(item=>{
        console.log(start);
        const div=document.createElement('div');
        div.className='item';
        div.innerHTML=`<h3>${item.title}</h3><p>${item.body}</p>`;
        content.appendChild(div);
         if(start==90){
             loading.innerText='End of feed';
         }
    })
}
const observer=new IntersectionObserver(async (entries)=>{
    if(entries[0].isIntersecting && !load){
        load=true;
        try{
            const data=await getPosts();
            appendData(data);
        }
        catch(e){
            console.log("error");
        }
        load=false;
    }
},{threshold:1.0})
observer.observe(loading);

