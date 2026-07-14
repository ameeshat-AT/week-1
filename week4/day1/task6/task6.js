async function fetchData() {
    try {
        const res1 = await fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10');
        const data1 = await res1.json();
        data1.forEach(item => {
            let article = document.createElement('article');
            article.classList.add('cards');
            let service = document.createElement('h2');
            service.innerText = item.title;
            let description = document.createElement('p');
            description.innerText = item.body;
            let seperation = document.createElement('hr');
            article.appendChild(service);
            article.appendChild(description);
            article.appendChild(seperation);
            services.appendChild(article);
        });
    }
    catch {
        console.log("error while loading");
    }
}

let services = document.getElementById('services');
if (services) {
    button = document.querySelector('.button');
    button.addEventListener('click', fetchData);
}

const mutationObserver = new MutationObserver(entries => {
    entries.forEach(entry => {
        const type=entry.type;
        const targname=entry.target.tagname?entry.target.tagname:"document";
        if (type === "childList") {
            const added=entry.addedNodes.length
            const removed=entry.removedNodes.length;
            log(`childList change on <${targname}> = added:${added},removed:${removed}`)
            entry.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('cards')) {
                    observer.observe(node);
                }
            });
        }
        else if(type==='attributes'){
             log(`Attribute ${entry.attributeName} changed on <${targname}>`)
        }
        else{
            if(type==='characterData'){
                log(`text changed in${targname}`);
            }
        }
    });
});

function log(msg){
    const time=new Date().toLocaleTimeString();
    const item=document.createElement('div');
    panel.appendChild(item);
    item.innerText=`[${time} ${msg}]`;
}
mutationObserver.observe(services, { childList: true ,attributes:true,characterData:true,subtree:true});
const cards = document.querySelectorAll('.cards');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
        else {
            entry.target.classList.remove("visible");
        }
    });
}, { threshold: 0.8 });
const initialElements = document.querySelectorAll('.initial')
initialElements.forEach(ele => observer.observe(ele));
let ticking = false;
const progressBar = document.getElementById('progress-bar');

function updateProgress() {
    const currentScroll = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight;
    const screenHeight = window.innerHeight;
    const scrollableDistance = totalHeight - screenHeight;
    if (scrollableDistance <= 0) return;

    const scrollPercentage = (currentScroll / scrollableDistance) * 100;

    if (progressBar) progressBar.style.width = `${scrollPercentage}%`
    ticking = false;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateProgress();
        })
        ticking = true;
    }
})
const panel = document.createElement('div');
console.log(panel);
panel.classList.add('dom-panel');
document.body.appendChild(panel);

// const box=document.querySelector('.nested-box')
// mutationObserver.observe(box.children[1].children[0],{classList:true,attributes:true,characterData:true,subtree:true})
// console.log(box.children[0])
// box.children[1].children[0].innerHTML="hello"