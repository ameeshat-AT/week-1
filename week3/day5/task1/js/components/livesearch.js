export function liveSearch() {
    // setTimeout(()=>{
    let search_input = document.getElementById('search');
    if (search_input) {
        function LiveSearch() {
            let card = document.querySelectorAll('.cards');
            let search_query = document.getElementById('search').value;
            let count = 0;
            for (let i = 0; i < card.length; i++) {
                if (card[i].innerText.toLowerCase().includes(search_query.toLowerCase())) {
                    card[i].classList.remove('is-hidden');
                    count = 1;
                }
                else {
                    card[i].classList.add('is-hidden');
                }

            }
            if (count === 0) {
                alert("Result note found");
            }

        }
        let typingTimer;
        let TypeInterval = 3000;
        search_input.addEventListener('keyup', () => {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(LiveSearch, TypeInterval);
        });

        let cards = document.querySelectorAll('.cards');
        search_input.addEventListener('input', (e) => {
            const text = e.target.value;
            const regtext = new RegExp(text + '(?=[^<>]*([<]|$))', 'gi');
            for (let i = 0; i < cards.length; i++) {
                let content = cards[i].innerHTML;
                content = content.replace(/(<span class="highlight">|<\/span>)/gim, '');
                const newtext = content.replace(regtext, '<span class="highlight">$&</span>');
                cards[i].innerHTML = newtext;

            }
        })
        search_input.addEventListener('input', (e) => {
            let btn = document.getElementById('button');
            if (e.target.value === '') {
                btn.classList.add('display');
            }
            else {
                btn.classList.remove('display');
            }
        });
        let input = document.querySelector('input[type="text"]');
        let btn = document.getElementById('button');
        let card = document.querySelectorAll('.cards');
        btn.addEventListener('click', () => {
            input.value = " ";
            for (let i = 0; i < card.length; i++) {
                card[i].classList.remove('is-hidden');
                let content = cards[i].innerHTML;
                content = content.replace(/(<span class="highlight">|<\/span>)/gim, '');
                card[i].innerHTML = content
            }
        })
    }
    // },4000);
}