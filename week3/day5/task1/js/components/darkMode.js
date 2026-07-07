export function DarkMode() {
    let darkmode = localStorage.getItem("darkmode");
    const theme_switch = document.getElementById('theme-switch');
    const enableDarkmode = () => {
        document.body.classList.add("darkmode");
        localStorage.setItem('darkmode', 'active');
        if(theme_switch) theme_switch.setAttribute("aria-pressed", "true");

    }
    const disableDarkmode = () => {
        document.body.classList.remove("darkmode");
        localStorage.setItem('darkmode', 'null');
        if(theme_switch) theme_switch.setAttribute("aria-pressed", "false");
    }
    if (darkmode === "active") {
        enableDarkmode()
    }
    if(theme_switch){
    theme_switch.addEventListener("click", () => {
        darkmode = localStorage.getItem("darkmode")
        darkmode !== "active" ? enableDarkmode() : disableDarkmode()
        // button.ariaPressed = button.ariaPressed === 'true' ? 'false' : 'true';
    })
}
}