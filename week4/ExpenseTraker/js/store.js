//fetch expense,addExpense and get Total
const dummyExpense = [
    { id: 1, text: 'Lunch', amount: 200 },
    { id: 2, text: 'salary', amount: 5000 }
];
export const getExpense = () => {
    return dummyExpense;
};
export const addExpense = (text, Amount) => {
    console.log(`Adding ${text}:${Amount} successfully`);
    return { id: Date.now(), text, amount };
};
export const getBalance = () => {
    return 1520;
};