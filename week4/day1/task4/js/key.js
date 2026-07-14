function closeDrawer() {
    const nav = document.getElementById("nav");
    const overlay = document.getElementById("overlay");
    if (overlay) overlay.classList.remove("show", 'open');
    let previousActiveElement = document.activeElement;
    //   const nav = document.getElementById("nav");
    if (nav) nav.classList.remove("open");
    const hamburger = document.getElementById("menu-box");
    document.body.classList.remove("no-scroll");
    hamburger.setAttribute("aria-expanded", "false");
    if (previousActiveElement) {
        previousActiveElement.focus();
    } else if (hamburger) {
        hamburger.focus();
    }
}
export function init() {
    document.addEventListener("keydown", function (event) {
        const nav = document.getElementById("nav");
        if (!nav.classList.contains("open")) return;
        if (event.key === "Escape") {
            closeDrawer();
            return;
        }
        if (event.key === "Tab") {
            const focusable = nav.querySelectorAll("a, button");
            if (focusable.length === 0) return;

            const firstEl = focusable[0];
            const lastEl = focusable[focusable.length - 1];
            const isFocusInside = nav.contains(document.activeElement);

            if (!isFocusInside) {
                event.preventDefault();
                if (event.shiftKey) {
                    lastEl.focus();
                } else {
                    firstEl.focus();
                }
                return;
            }
            if (event.shiftKey) {
                if (document.activeElement === firstEl) {
                    event.preventDefault();
                    lastEl.focus();
                }
            } else {
                if (document.activeElement === lastEl) {
                    event.preventDefault();
                    firstEl.focus();
                }
            }
        }
    });
}