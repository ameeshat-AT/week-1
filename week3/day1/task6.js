//getElementById
const element = document.getElementById('head');
element.style.color = "red";
element.style.textAlign = "center";
//getElementByClassName
const value = document.getElementsByClassName('green');
value[0].style.color = "green";
value[1].style.color = "green";
//getElementByTagName
const tag_name = document.getElementsByTagName('p');
tag_name[0].style.textAlign = "center";
//querySelector
const content = document.querySelector('.select');
content.style.color = "blue";
//querySelectorAll
const name = document.querySelectorAll('.select');
name[2].style.color = "pink";
name[3].style.color = "orange";
//DOM traversal
//walk to parent
const temp=document.getElementsByClassName('select');
const parent=temp[0].parentElement;
console.log(parent);
//walk to first child
const variable =document.getElementsByClassName('parent');
const first_child=variable[0].firstElementChild;
console.log(first_child);
const last_child=variable[0].lastElementChild;
console.log(last_child);
const sibling=name[3].nextElementSibling;
console.log(sibling);
 // addCard using CreateElement and textContent
const addCard=document.createElement("div");
 const new_title=document.createElement("h1");
 const main_body=document.createElement("p");
 const image=document.createElement("img");
 image.src="https://thumbs.dreamstime.com/b/human-face-isolated-white-background-spa-portrait-beautiful-fresh-healthy-woman-beauty-close-up-portrait-beautiful-126143418.jpg";
 image.alt="smiling face of Eliza";
image.style.width="300px";
image.id="eliza";
main_body.textContent="I am assosiate Software Engineer currently working at AKGD technology";
new_title.textContent="Eliza Ebraham";
document.body.appendChild(addCard);
addCard.appendChild(image);
addCard.appendChild(new_title);
addCard.appendChild(main_body);
//remove an item using card
document.getElementById("eliza").remove();
//remove the entire card
addCard.remove();

