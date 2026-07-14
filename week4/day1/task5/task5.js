const lazyImges = document.querySelectorAll('img[data-src]');
const header = document.getElementById('miniheader');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            header.innerText = entry.target.getAttribute('data-title')
            const image = entry.target;
            image.classList.add('show');
            image.src = image.getAttribute('data-src');
            // observer.unobserve(img);
        }
        else {
            entry.target.classList.remove('show');
        }
    });
}, { threshold: 0, rootMargin: '-100px 0px 0px 0px' });
lazyImges.forEach(image => imageObserver.observe(image));