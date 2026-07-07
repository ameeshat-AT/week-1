let acc = Array.from(document.getElementsByClassName("accordion"));
let panal = document.getElementsByClassName("panal");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', () => {
        localStorage.setItem('item', panal[i].innerHTML)
        let state = acc[i].getAttribute('aria-expanded') === 'true';
        acc[i].setAttribute('aria-expanded', !state);
        if (panal[i].style.display === 'block') {
            panal[i].style.display = 'none';
        }
        else {
            panal[i].style.display = 'block';
        }
        for (let j = 0; j < acc.length; j++) {
            if (j !== i) {
                panal[j].style.display = 'none';
            }
        }

    })

}
export function keystrock(){
acc.forEach((head, index) => {
    head.addEventListener('keydown', (e) => {
        let newIndex;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                newIndex = (index + 1) % acc.length;
                acc[newIndex].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                newIndex = (index - 1 + acc.length) % acc.length;
                acc[newIndex].focus();
                break;
            case 'Home':
                e.preventDefault();
                acc[0].focus();
                break;
            case 'End':
                e.preventDefault();
                acc[acc.length - 1].focus();
                break;
            case 'space' | 'Enter':
                if (panal[i].style.display === 'block') {
                    panal[i].style.display = 'none';
                }
                else {
                    panal[i].style.display = 'block';
                }
                break;
        }
    })
})
}

export function showTask() {
    localStorage.getItem('item');
}
showTask();
keystrock();