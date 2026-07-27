import { renderHome, renderListPage, renderDetail, overallSummary, renderSettings } from "./render.js";
import { initRouter, navigateTo, register } from "./router.js";
import { createStore } from "./store.js";
//initial state
const savedTransaction = localStorage.getItem('transaction');
const initilaTransaction = savedTransaction ? JSON.parse(savedTransaction) : [];
const initialState = {
    route: { path: '/Home', params: {}, component: null },
    // transaction: [{ id: '101', catogory: "Groceries", amount: -300, date: '2026-07-23', description:"buy 1 pack bread and 2 eggs"}, { id: '102', catogory: "Salary", amount: 3000, date: '2026-07-24' ,description:"Recive the monthly income from abc pvt limit"}]
    transaction: initilaTransaction
};
//check whether navigate or add newItem
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ROUTE':
            return { ...state, route: action.payload };

        case 'ADD_TRANSACTION':
            return { ...state, transaction: [...state.transaction, action.payload] };

        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transaction: state.transaction.filter(t => t.id !== action.payload)
            };

        case 'UPDATE_TRANSACTION':
            return {
                ...state,
                transaction: state.transaction.map(t =>
                    t.id === action.payload.id ? action.payload : t
                )
            };
        default:
            return state;

    }
};
const store = createStore(initialState, appReducer);

register('/home', renderHome);
register('/list', renderListPage);
register('/detail/:id', renderDetail);
register('/summary', overallSummary);

const renderApp = () => {
    const state = store.getState();
    const currentComponent = state.route.component;
    const container = document.getElementById('app');
    container.classList.remove('fade-in');
    container.innerHTML = '';
    if (currentComponent) {
        const info = currentComponent(state, navigateTo, store.dispatch);
        // console.log(info)
        // container.innerHTML = info
        container.appendChild(info);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                container.classList.add('fade-in');
            });
        });
    }
    else {
        container.innerHTML = `<h1>404 - Page Not Found</h1>`;
    }
    // console.log(state);
};
store.subscribe(renderApp);
renderApp();
// console.log("hello")
initRouter(store);
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a')
    if (anchor) {
        e.preventDefault();
        const targetHref = anchor.getAttribute('href');
        navigateTo(targetHref);
    }
});
