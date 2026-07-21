import { renderNavbar, renderPage } from "./render.js";
import { initRouter, navigateTo } from "./router.js";
import { getExpense, addExpense, getBalance } from "./store.js";
function initApp() {
    renderNavbar('nav');
    initRouter();
    console.log('initial state loaded:', getExpense());
    console.log('initial balance', getBalance());
    navigateTo('./Expense');
}
document.addEventListener("DOMContentLoaded", initApp);