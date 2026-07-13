boxes = document.querySelectorAll('.box');
function animateCount(element) {
    let start = null;
    const duration = 2000;
    const target = parseInt(element.getAttribute('data-target'), 10);
    function step(timestamp) {
        if (!start)
            start = timestamp;
        const progress = timestamp - start
        const progressPersentage = Math.min(progress / duration, 1);
        const currentValue = Math.floor(progressPersentage * target)
        element.textContent = currentValue.toLocaleString();
        if (progress < duration) {
            requestAnimationFrame(step)
        }
        else {
            element.textContent = target.toLocaleString();
        }
    }
    requestAnimationFrame(step);
}
counterObserver = new IntersectionObserver((elements, observer) => {
    elements.forEach(el => {
        if (el.isIntersecting) {
            animateCount(el.target);
            //  observer.unobserve(el.target)
        }
    });
}, { threshold: 1 });
boxes.forEach((e) => counterObserver.observe(e));