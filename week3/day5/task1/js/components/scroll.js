export function Scroll()
{const cards = document.querySelectorAll('.animate');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
        else {
            entry.target.classList.remove("visible");
        }
    });
}, { threshold: 0.3 });
cards.forEach((card) => {
    observer.observe(card)
}
);
let ticking = false;
let backToTopBtn = document.getElementById('backtoTop');
const progressBar = document.getElementById('progress-bar');
function updateProgress() {
    const currentScroll = window.scrollY;
    if (currentScroll > 100) {
        backToTopBtn.classList.add("show");
    }
    else {
        backToTopBtn.classList.remove("show");
    }
    const totalHeight = document.documentElement.scrollHeight;
    const screenHeight = window.innerHeight;
    const scrollableDistance = totalHeight - screenHeight;
    if (scrollableDistance <= 0) return;

    const scrollPercentage = (currentScroll / scrollableDistance) * 100;

    if(progressBar) progressBar.style.width = `${scrollPercentage}%`
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
}