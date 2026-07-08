export function fetchService(){
async function fetchData() {
       let skeleton=document.createElement('div');
       let first=document.createElement('div');
       let second=document.createElement('div');
       let third=document.createElement('div');
       first.classList.add('loading-skeletton');
       second.classList.add('loading-skeletton');
       third.classList.add('loading-skeletton');
       skeleton.classList.add('skeletton');
       skeleton.appendChild(first);
       skeleton.appendChild(second);
       skeleton.appendChild(third);
       document.body.appendChild(skeleton);
       try{
        document.body.style.opacity="0.3"
       const res1=await fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10');
       document.body.style.opacity="1";
       const data1=await res1.json();
      skeleton.remove('skeletton')
        data1.forEach(item=>{
        let article=document.createElement('article');
        article.classList.add('cards');
        let service=document.createElement('h2');
        service.innerText=item.title;
        let description=document.createElement('p');
        description.innerText=item.body;
        let seperation=document.createElement('hr');
        article.appendChild(service);
        article.appendChild(description);
        article.appendChild(seperation);
        services.appendChild(article);
       });
    }
     catch{
        skeleton.remove('skeletton');
        console.log("error while loading");
        let resetButton=document.createElement('button');
        resetButton.classList.add('resetBtn');
        resetButton.innerText="Reset";
        resetButton.addEventListener("click", fetchData());
        document.body.appendChild(resetButton)
       }
}
let services=document.getElementById('services');
if(services){
    fetchData();
}
}
export function fetchUser(){
    async function Users() {
        let skeleton=document.createElement('div');
       let first=document.createElement('div');
       let second=document.createElement('div');
       let third=document.createElement('div');
       first.classList.add('loading-skeletton');
       second.classList.add('loading-skeletton');
       third.classList.add('loading-skeletton');
       skeleton.classList.add('skeletton');
       skeleton.appendChild(first);
       skeleton.appendChild(second);
       skeleton.appendChild(third);
       document.body.appendChild(skeleton);
       try{
        document.body.style.opacity="0.3"
        const res2=await fetch('https://jsonplaceholder.typicode.com/users')
        document.body.style.opacity="1"
        const users=await res2.json();
         skeleton.remove('skeletton')
        let c=0;
        let devTeam=document.getElementById('development-team');
        let manTeam=document.getElementById('Management-team');
        users.forEach(user=>{
            let container=document.createElement('div');
            let image=document.createElement('img');
            image.classList.add('image');
            let name=document.createElement('p');
            name.style.paddingLeft='20px';
            name.innerText=user.name;
            let role=document.createElement('h3');
            role.innerText=user.username;
            let desc=document.createElement('p')
            desc.innerText=user.company.catchPhrase;
            container.appendChild(image);
            container.appendChild(name);
            container.appendChild(role);
            container.appendChild(desc);
            if(c%2===0){
                devTeam.appendChild(container);
            }
            else{
                manTeam.appendChild(container)
            }
            c=c+1;
        })
    }
    catch{
        skeleton.remove('skeletton');
        console.log("error while loading");
        let resetButton=document.createElement('button');
        resetButton.classList.add('resetBtn');
        resetButton.innerText="Reset";
        resetButton.addEventListener("click", Users());
        document.body.appendChild(resetButton)
    }
    }

    let team=document.getElementById('our-team')
    if(team){
        Users();
    }  
}
export function fetchRecentPosts(){
async function recentPosts() {
    let skeleton=document.createElement('div');
       let first=document.createElement('div');
       let second=document.createElement('div');
       let third=document.createElement('div');
       first.classList.add('loading-skeletton');
       second.classList.add('loading-skeletton');
       third.classList.add('loading-skeletton');
       skeleton.classList.add('skeletton');
       skeleton.appendChild(first);
       skeleton.appendChild(second);
       skeleton.appendChild(third);
       document.body.appendChild(skeleton);
       try{
       const res=await fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=3');
       const posts=await res.json();
       skeleton.remove('skeletton')
       posts.forEach(post=>{
        let article=document.createElement('article');
        let title=document.createElement('h2');
        title.innerText=post.title;
        let description=document.createElement('p');
        description.innerText=post.body;
        let seperation=document.createElement('hr');
        article.appendChild(title);
        article.appendChild(description);
        article.appendChild(seperation);
        index.appendChild(article);
       }); 
    } 
        catch{
        skeleton.remove('skeletton');
        console.log("error while loading");
        let resetButton=document.createElement('button');
        resetButton.classList.add('resetBtn');
        resetButton.innerText="Reset";
        resetButton.addEventListener("click", recentPosts());
        document.body.appendChild(resetButton)
    }
}
let index=document.getElementById('index');
if(index){
    recentPosts();
}
}