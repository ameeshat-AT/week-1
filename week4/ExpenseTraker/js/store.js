//fetch expense,addExpense and get Total
export const createStore = (initialState, reducer) => {
    let state = initialState;
    let listeners = [];
    //return current state
    const getState = () => state;
    //an action is send to update state and inform the subscribers
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
        console.log(listeners)
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