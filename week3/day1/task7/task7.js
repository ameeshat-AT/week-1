let darkmode = localStorage.getItem("darkmode");
const theme_switch = document.getElementById('theme-switch');
enableDarkmode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem('darkmode', 'active');
    darkmode.setAttribute("aria-pressed", "true");

}
disableDarkmode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem('darkmode', 'null');
    darkmode.setAttribute("aria-pressed", "false");
}
if (darkmode === "active") {
    enableDarkmode()
}
theme_switch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode")
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
    button.ariaPressed = button.ariaPressed === 'true' ? 'false' : 'true';
})