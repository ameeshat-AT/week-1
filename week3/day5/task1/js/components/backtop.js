export function BackToTop(){
let backToTopBtn = document.getElementById('backtoTop');
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
}