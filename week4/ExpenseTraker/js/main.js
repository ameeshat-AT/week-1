import { renderHome ,renderListPage} from "./render.js";
import { initRouter, navigateTo, register } from "./router.js";
import { createStore } from "./store.js";
//initial state
console.log("this is the main page")
const initialState = {
    route: { path: '/Home', params: {}, component: null },
    transaction: [{ id: '101', Catogory: "Groceries", amount: -300 ,date:'31/02/2026'}, { id: '102', Catogory: "Salary", amount: 3000 ,date:'31/03/2026'}]
};
//check whether navigate or add newItem
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ROUTE':
            return { ...state, route: action.payload };
        case 'ADD_TRANSACTION':
            return { ...state, transaction: [...state.transaction, action.payload] };
        default:
            return state;
    }
};
const store = createStore(initialState, appReducer);

register('./home', renderHome);
register('./list', renderListPage);
// register('./settings', renderSettings);
// register('./detail/:id', renderDetail);
const renderApp = () => {
    const state = store.getState();
    const currentComponent = state.route.component;
    const container = document.getElementById('app');
    container.innerHTML='';
    if (currentComponent) {
        const info = currentComponent(state,navigateTo,store.dispatch);
        // console.log(info)
        // container.innerHTML = info
        container.appendChild(info);
    }
    else {
        container.innerHTML = `<h1>404 - Page Not Found</h1>`;
    }
};
store.subscribe(renderApp);
// renderApp();
initRouter(store);
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a')
    if (anchor) {
        e.preventDefault();
        const targetHref = anchor.getAttribute('href');
        navigateTo(targetHref);
    }
});
