let darkmode = localStorage.getItem("darkmode");
const theme_switch = document.getElementById('theme-switch');
enableDarkmode = () => {
  document.body.classList.add("darkmode")
  localStorage.setItem('darkmode', 'active')
  darkmode.setAttribute("aria-pressed", "true");
}
disableDarkmode = () => {
  document.body.classList.remove("darkmode")
  localStorage.setItem('darkmode', 'null')
  darkmode.setAttribute("aria-pressed", "false");
}
if (darkmode === "active") {
  enableDarkmode()
}
theme_switch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode")
  darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})

let previousActiveElement = null;

function openDrawer() {
  const nav = document.getElementById("nav");
  const overlay = document.getElementById("overlay");
  const hamburger = document.getElementById("menu-box");

  previousActiveElement = document.activeElement;

  nav.classList.add("open");
  if (overlay) overlay.classList.add("show");
  document.body.classList.add("no-scroll");
  hamburger.setAttribute("aria-expanded", "true");
  const focusable = nav.querySelectorAll("a, button");
  if (focusable.length > 0) {
    focusable[0].focus();
  }
}

function closeDrawer() {
  const nav = document.getElementById("nav");
  const overlay = document.getElementById("overlay");
  const hamburger = document.getElementById("menu-box");

  nav.classList.remove("open");
  if (overlay) overlay.classList.remove("show");
  document.body.classList.remove("no-scroll");
  hamburger.setAttribute("aria-expanded", "false");

  if (previousActiveElement) {
    previousActiveElement.focus();
  } else if (hamburger) {
    hamburger.focus();
  }
}

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
