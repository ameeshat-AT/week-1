import { Button, card, TransactionFormModal } from "./component.js";
//render Home Page
export const renderHome = (state, navigateTo, dispatch) => {
    const container = document.createElement('div');
    //create the heading for home page
    const heading = document.createElement('h2');
    heading.textContent = 'Add Transaction ';
    container.appendChild(heading);

    //Adding the add button to add new transaction
    const addbtn = Button({
        text: 'add-new-item',
        className: 'addbtn',
        onClick: () => {
            const modal = TransactionFormModal({
                title: "Add new Expense",
                onClose: () => {
                    modal.remove();
                },
                onSave: (formData) => {
                    dispatch({
                        type: 'ADD_TRANSACTION',
                        payload: {
                            id: String(Math.floor(Math.random() * 1000000)),
                            ...formData
                        }
                    });
                    navigateTo('/list');
                }
            });
            container.appendChild(modal);
        }
    });

    container.appendChild(addbtn);
    return container;
}

//Render list
export const renderListPage = (state, navigateTo, dispatch) => {
    const container = document.createElement('div');
    container.classList.add('list-page-container');
    //heading
    const heading = document.createElement('h2');
    heading.textContent = 'All Transaction Log';
    container.appendChild(heading);
    //content
    const actionRow = document.createElement('div');
    actionRow.classList.add('action-row');
    const goHomeBtn = Button({ text: 'Back To Home', onClick: () => navigateTo('./home'), className: 'nav-btn' });
    actionRow.appendChild(goHomeBtn);

    const transactions = state.transaction || [];
    if (transactions.length === 0) {
        const emptyCard = card("There is no logs are recorded", '', 'empty-card');
        container.appendChild(emptyCard);
        container.appendChild(actionRow);
        return container;
    }
    transactions.forEach((transaction) => {
        const rowContent = document.createElement('div');
        rowContent.classList.add('trans-list');
        const metaData = document.createElement('div');
        metaData.classList.add('meta-data');
        const listTitle = document.createElement('strong');
        listTitle.textContent = `[id:${transaction.id}]${" "}${transaction.catogory}`;
        const metaValue = document.createElement('span');
        metaValue.textContent = `Amount:$${transaction.amount}`;
        metaValue.style.color = transaction.amount < 0 ? 'red' : 'green';
        metaData.appendChild(listTitle);
        metaData.appendChild(metaValue);
        const viewBtn = Button({
            text: 'View Details', onClick: () => {
                navigateTo(`./detail/${transaction.id}`)
            }, className: 'navigation'
        });
        const deleteBtn = Button({
            text: 'Delete',
            className: 'delete-btn',
            onClick: () => {
                if (confirm("Are you sure you want to delete this log?")) {
                    dispatch({
                        type: 'DELETE_TRANSACTION',
                        payload: transaction.id
                    });
                }
            }
        });
        const editBtn = Button({
            text: 'Edit Details',
            onClick: () => {
                const editModal = TransactionFormModal({
                    title: 'Modify Transaction Information',
                    initialData: transaction, // Pre-fill with existing log values
                    onClose: () => editModal.remove(),
                    onSave: (updatedData) => {
                        dispatch({
                            type: 'UPDATE_TRANSACTION',
                            payload: {
                                id: transaction.id, // Preserves baseline tracking identifier keys
                                ...updatedData
                            }
                        });
                        navigateTo('/list');
                    }
                });
                container.appendChild(editModal);
            }
        });
        const btns = document.createElement('div')
        btns.classList.add('buttons');
        rowContent.appendChild(metaData);
        btns.appendChild(viewBtn);
        btns.appendChild(editBtn);
        btns.appendChild(deleteBtn)
        rowContent.appendChild(btns)
        // const itemCard=card('',[rowContent],transaction.amount<0?'expense':'income');
        container.appendChild(rowContent);
    });
    container.appendChild(actionRow);
    return container;
};
export const renderDetail = (state, navigateTo, dispatch) => {
    const container = document.createElement('div');
    const transactionId = state.route.params?.id;
    const transaction = state.transaction.find(t => t.id === transactionId);
    if (!transaction) {
        const errorCard = card("Error:Transaction Record Not Found");
        container.appendChild(errorCard);
        const backBtn = Button({ text: 'Back to List', onClick: () => { navigateTo('./list') }, className: 'back-to-list' });
        backBtn.classList.add('backBtn')
        container.appendChild(backBtn);
        return container;
    }
    const heading = document.createElement('div');
    heading.textContent = "Transaction Details";
    heading.classList.add('detailsHead')
    const date = document.createElement('div');
    date.innerText = `Date = ${new Date(transaction.date)};`
    const catogory = document.createElement('div');
    catogory.innerText = `Catogory = ${transaction.catogory};`
    const description = document.createElement('div');
    description.innerText = `Description = ${transaction.description};`
    const amount = document.createElement('div');
    console.log(transaction.amount);
    transaction.amount > 0 ? amount.style.color = 'green' : amount.style.color = 'Red';
    amount.innerText = `Amount = ${amount < 0 ? String(transaction.amount).slice(1) : transaction.amount}`
    container.appendChild(heading);
    const isExpense = transaction.amount < 0 ? 1 : 0;
    console.log(isExpense)
    if (isExpense) {
        const expenseCard = card("Expense", [date, catogory, description, amount,], 'expense');
        container.appendChild(expenseCard)
    }
    else {
        const IncomeCard = card("Income", [date, catogory, description, amount,], 'expense');
        container.appendChild(IncomeCard)
    }
    const backBtn = Button({ text: 'Back to List', onClick: () => { navigateTo('./list') }, className: 'back-to-list' });
    backBtn.classList.add('backBtn')
    container.appendChild(backBtn);
    return container;
}
export const overallSummary = (state, navigateTo, dispatch) => {
    const container = document.createElement('div');
    const heading = document.createElement('h2');
    heading.textContent = 'Summary ';
    container.appendChild(heading);
    // calculate and display Total balance 
    const balance = state.transaction.reduce((acc, t) => acc + t.amount, 0);
    const totalIncome = state.transaction.filter(l => l.amount > 0).reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = state.transaction.filter(l => l.amount < 0).reduce((acc, t) => acc + t.amount, 0);
    const balanceText = document.createElement('p');
    balanceText.textContent = `Total Account Balance:$${balance}`;
    const income = document.createElement('p');
    income.textContent = `Total Income:$${totalIncome}`;
    const expense = document.createElement('p');
    expense.textContent = `Total Expense:$${totalExpense}`;
    const balanceCard = card('Total Expense', [income, expense, balanceText], 'balance')
    container.appendChild(balanceCard)
    const goHomeBtn = Button({ text: 'Back To Home', onClick: () => navigateTo('./home'), className: 'backBtn' });
    container.appendChild(goHomeBtn)
    return container;
}
export const renderSettings = (state, navigateTo, dispatch) => {
    const container = document.createElement('div');
    return container;

}