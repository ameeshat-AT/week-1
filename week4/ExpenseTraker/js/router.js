//for initialization and manual navigation
const routes = [];
let appStore = null;
//register each path to the router
export const register = (path, component) => {
    const cleanPath = path.replace(/^\./, '');
    const regexPath = new RegExp('^' + cleanPath.replace(/:[^\s/]+/g, "([^/]+)") + '$');
    const matches = cleanPath.match(/:[^\s/]+/g) || [];
    const paramNames = matches.map((key) => key.substring(1));
    routes.push({ regexPath, paramNames, component })
    // console.log(regexPath);
};
const resolveRoute = () => {
    let currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/week4/ExpenseTraker/traker.html' || currentPath === "")
        currentPath = '/home';
    // console.log(currentPath);
    for (const route of routes) {
        const match = currentPath.match(route.regexPath);
        if (match) {
            const paramValues = match.slice(1);
            const params = route.paramNames.reduce((acc, name, index) => {
                acc[name] = paramValues[index];
                return acc;
            }, {});
            if (appStore) {
                appStore.dispatch({
                    type: 'SET_ROUTE',
                    payload: {
                        path: currentPath,
                        params: params,
                        component: route.component
                    }
                });
            }
            return;
        }
    }
    if (appStore) {
        appStore.dispatch({
            type: 'SET_ROUTE',
            payload: {
                path: '/404',
                params: {},
                component: null
            }
        });
    }
};
export const initRouter = (store) => {
    appStore = store;
    window.addEventListener('popstate', () => {
        resolveRoute();
    });
    // console.log("router Initalized");
    resolveRoute();//for initial loadig
};
export const navigateTo = (path) => {
    const cleanPath = path.replace(/^\./, '');
    window.history.pushState({}, "", cleanPath);
    resolveRoute();
    // console.log("nabigate to", path);
    // return true;
};
