const lightBox = document.createElement('div');
lightBox.id = 'light-box';
document.body.appendChild(lightBox);
const images = document.querySelectorAll('img');
images.forEach((image, ind) => {
    image.addEventListener('click', () => {
        index = ind;
        working(image);
    })
})

lightBox.addEventListener('click', () => {
    lightBox.classList.remove('visible');
    document.body.classList.remove('no-scroll');
})
let index = 0;
const next = document.getElementById('next');
next.addEventListener('click', () => {
    let newIndex = (index + 1 + images.length) % images.length
    index = newIndex;
    working(images[newIndex]);
})
const prev = document.getElementById('Previous');
prev.addEventListener('click', () => {
    let newIndex = (index - 1 + images.length) % images.length
    index = newIndex;
    working(images[newIndex]);
})
document.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (e.key === 'ArrowRight') {
        let newIndex = (index + 1 + images.length) % images.length
        index = newIndex;
        working(images[newIndex]);
    }
    if (e.key === 'ArrowLeft') {
        let newIndex = (index - 1 + images.length) % images.length
        index = newIndex;
        working(images[newIndex]);
    }
    if (e.key === 'Escape') {
        lightBox.classList.remove('visible');
        while (lightBox.firstChild) {
            lightBox.removeChild(lightBox.firstChild);
            document.body.classList.remove('no-scroll');
        }
        if (e.key === 'Tab') {
            e.preventDefault();

        }
    }
})
function working(image) {
    while (lightBox.firstChild) {
        lightBox.removeChild(lightBox.firstChild);
    }
    lightBox.classList.add('visible');
    const img = document.createElement('img');
    img.src = image.src;
    img.classList.add('center');
    lightBox.appendChild(img);
    document.body.classList.add('no-scroll');
}

lightBox.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

lightBox.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;

    const swipeDistance = touchStartX - touchEndX;
    if (Math.abs(swipeDistance) > 40) {
        if (swipeDistance > 0) {
            let newIndex = (index - 1 + images.length) % images.length
            index = newIndex;
            working(images[newIndex]);
        }
        else {
            let newIndex = (index - 1 + images.length) % images.length
            index = newIndex;
            working(images[newIndex]);
        }
    }
});