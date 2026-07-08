const input = document.getElementById('input-box');
const items = document.getElementById('list-items');
const button = document.getElementById('button');
items.addEventListener('click', function (e) {
    const box = e.target.closest(".box");
    if (box) {
        const textbox = box.closest('.item').querySelector('.text');
        textbox.classList.toggle('completed', box.checked);
        return;
    }
    const dltbtn = e.target.closest(".btn")
    if (dltbtn) {
        const item = dltbtn.closest(".item")
        item.remove();
        return;
    }
    const text_box = e.target.closest('.text');
    if (text_box) {
        text_box.contentEditable = "true";
        text_box.focus();
    }
}
)
button.addEventListener('click', () => {
    if (input.value === '') {
        alert("enter the task");
    }
    else {
        const text = input.value;
        let li = document.createElement("li");
        li.className = "item";
        li.innerHTML =
            `<input type="checkbox" class="box">
            <span class="text">${text}</span>
            <button class="btn">Delete</button>`;
        items.appendChild(li)
        input.value = "";
        saveDate();

    }

})

function saveDate() {
    localStorage.setItem("data-item", items.innerHTML);
}
function showTask() {
    items.innerHTML = localStorage.getItem("data-item");
}
showTask();