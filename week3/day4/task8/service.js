const search_input = document.getElementById('search');
const btn = document.getElementById('button');
const cards = document.querySelectorAll('.cards');

let typingTimer;
const TypeInterval = 300;

function LiveSearch() {
    const search_query = search_input.value.trim();
    let matchFound = false;

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].innerText.toLowerCase().includes(search_query.toLowerCase())) {
            cards[i].classList.remove('is-hidden');
            matchFound = true;
        } else {
            cards[i].classList.add('is-hidden');
        }
    }

    if (search_query.length > 0 && !matchFound) {
        alert("Result not found");
    }

    const params = new URLSearchParams();
    if (search_query) {
        params.set('search', search_query);
    }
    const queryString = params.toString();
    const targetURL = window.location.pathname + (queryString ? '?' + queryString : '');

    window.history.pushState({ search: search_input.value }, '', targetURL);
}

function initializeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const savedQuery = urlParams.get('search') || '';

    if (savedQuery) {
        
        search_input.value = savedQuery;
        btn.classList.remove('display');
        applyTextHighlighting(savedQuery);
        let matchFound = false;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].innerText.toLowerCase().includes(savedQuery.toLowerCase())) {
                cards[i].classList.remove('is-hidden');
                matchFound = true;
            } else {
                cards[i].classList.add('is-hidden');
            }
        }
    }
}

window.addEventListener('popstate', (event) => {
    if (event.state && typeof event.state.search !== 'undefined') {
        search_input.value = event.state.search;
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        search_input.value = urlParams.get('search') || '';
    }

    if (search_input.value === '') {
        btn.classList.add('display');
    } else {
        btn.classList.remove('display');
    }
    applyTextHighlighting(search_input.value);

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].innerText.toLowerCase().includes(search_input.value.toLowerCase())) {
            cards[i].classList.remove('is-hidden');
        } else {
            cards[i].classList.add('is-hidden');
        }
    }
});

function applyTextHighlighting(text) {
    if (!text.trim()) {
        for (let i = 0; i < cards.length; i++) {
            cards[i].innerHTML = cards[i].innerHTML.replace(/(<span class="highlight">|<\/span>)/gim, '');
        }
        return;
    }

    const regtext = new RegExp(text + '(?=[^<>]*([<]|$))', 'gi');
    for (let i = 0; i < cards.length; i++) {
        let content = cards[i].innerHTML;
        content = content.replace(/(<span class="highlight">|<\/span>)/gim, '');
        const newtext = content.replace(regtext, '<span class="highlight">$&</span>');
        cards[i].innerHTML = newtext;
    }
}

search_input.addEventListener('input', (e) => {
    const text = e.target.value;

    if (text === '') {
        btn.classList.add('display');
    } else {
        btn.classList.remove('display');
    }

    applyTextHighlighting(text);

    clearTimeout(typingTimer);
    typingTimer = setTimeout(LiveSearch, TypeInterval);
});

btn.addEventListener('click', () => {
    search_input.value = ""; 
    btn.classList.add('display');

    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove('is-hidden');
        let content = cards[i].innerHTML;
        content = content.replace(/(<span class="highlight">|<\/span>)/gim, '');
        cards[i].innerHTML = content;
    }
    LiveSearch();
    search_input.focus();
});

document.addEventListener('DOMContentLoaded', () => {
    initializeFromURL();
});
