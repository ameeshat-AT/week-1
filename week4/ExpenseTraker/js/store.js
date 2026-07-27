
//fetch expense,addExpense and get Total
export const createStore = (initialState, reducer) => {
    let state = initialState;
    let listeners = [];
    //return current state
    const getState = () => state;
    //an action is send to update state and inform the subscribers
    const rawDispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    };
    const dispatch = (action) => {
        rawDispatch(action);
        if (action.type !== 'SET_ROUTE') {
            try {
                localStorage.setItem('transaction', JSON.stringify(state.transaction || []))
            }
            catch (error) {
                console.log("failed to write snapshote to local storage");
            }
        }
    };
    //register a callbackfn to all UI view to run whenever state is updated
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        };
    };
    return { getState, dispatch, subscribe };
};