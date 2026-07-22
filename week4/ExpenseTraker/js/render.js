import { Button, card } from "./component.js";
//render Home Page
export const renderHome = (state, navigateTo, dispatch) => {
    function onSubmit() {
        overlayContainer.classList.remove('display');
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: {
                id: String(Math.floor(Math.random() * 1000000)),
                catogory: select.value,
                amount: parseFloat(aInput.value),
                date:dInput.value
            }
        });
        navigateTo('./list');
    }
    const container = document.createElement('div');
    //create the heading for home page
    const heading = document.createElement('h2');
    heading.textContent = 'Add Transaction &Summary';
    container.appendChild(heading);

    // calculate and display Total balance 
    const balance = state.transaction.reduce((acc, t) => acc + t.amount, 0);
    const balanceText = document.createElement('p');
    balanceText.textContent = `Total Account Balance:$${balance}`;
    const balanceCard = card('current Account status', balanceText, 'balance')
    container.appendChild(balanceCard)

    //Adding the add button to add new transaction
    const addbtn = Button({ text: 'add-new-item', onClick: () => { overlayContainer.classList.add('display'); }, className: 'addbtn' });
    container.appendChild(addbtn)

    //form container
    const overlayContainer = document.createElement('div');
    overlayContainer.classList.add("overlay-container");
    const span = document.createElement('span');
    span.innerText = 'Add New Expense';
    const closeBtn = Button({ text: 'close', onClick: () => { overlayContainer.classList.remove('display'); }, className: 'close' });
    const overlayHead = card('', [span, closeBtn], 'overlay-head');

    const dlabel = document.createElement('label');
    dlabel.innerText = 'Date:';
    const dInput = document.createElement('input');
    dInput.type = 'date';
    dInput.id = 'date';
    dInput.required = 'true';
    const date = card('', [dlabel, dInput], 'date');

    const types = ['Food', 'Rent', 'Travel', 'Income', 'Shopping']
    const slabel = document.createElement('label');
    slabel.innerText = 'Catogory:';
    const select = document.createElement('select');
    select.id = 'catogory';
    select.name = 'catogory';
    select.required = 'true';
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        select.appendChild(option);
    })
    const catogory = card('', [slabel, select], 'catogory');

    const descrlabel = document.createElement('label');
    descrlabel.innerText = 'Description:';
    const descrInput = document.createElement('input');
    descrInput.type = 'text';
    descrInput.id = 'description';
    descrInput.required = 'true';
    descrInput.placeholder = 'buy new black hand bag';
    const description = card('', [descrlabel, descrInput], 'description');

    const alabel = document.createElement('label');
    alabel.innerText = 'Amount:';
    const aInput = document.createElement('input');
    aInput.type = 'text';
    aInput.id = 'amount';
    aInput.required = 'true';
    aInput.placeholder = '+ve for reveneue -ve for expense';
    const amount = card('', [alabel, aInput], 'amount');

    const submitBtn = Button({ text: 'submit', onClick: onSubmit, className: '' });
    submitBtn.type = "submit";
    const submit = card('', [submitBtn], 'button');

    const overlay = card('', [overlayHead, date, catogory, description, amount, submit], 'overlay');
    overlayContainer.appendChild(overlay);
    container.appendChild(overlayContainer);
    return container;
}

//Render list
export const renderListPage=(state, navigateTo, dispatch)=>{
    const container=document.createElement('div');
    container.classList.add('list-page-container');
    //heading
    const heading=document.createElement('h2');
    heading.textContent='All Transaction Log';
    container.appendChild(heading);
    //content
    const actionRow=document.createElement('div');
    actionRow.classList.add('action-row');
    const goHomeBtn=Button({text:'Back To Home',onClick:()=>navigateTo('./home'),className:'nav-btn'});
    actionRow.appendChild(goHomeBtn);

    const transactions=state.transaction||[];
    if(transactions.length===0){
        const emptyCard=card("There is no logs are recorded",'','empty-card');
        container.appendChild(emptyCard);
        return container;
    }
    transactions.forEach((transaction)=>{
        const rowContent=document.createElement('div');
        rowContent.classList.add('trans-list');
        const metaData=document.createElement('div');
        metaData.classList.add('meta-data');
        const listTitle=document.createElement('strong');
        listTitle.textContent=`[id:${transaction.id}]${" "}${transaction.Catogory}`;
        const metaValue=document.createElement('span');
        metaValue.textContent=`Amount:$${transaction.amount}`;
        metaValue.style.color=transaction.amount<0?'red':'green';
        metaData.appendChild(listTitle);
        metaData.appendChild(metaValue);
        const viewBtn=Button({text:'View Details',onClick:()=>{
            navigateTo(`/details/${transaction.id}`)},className:'navigation'});
    rowContent.appendChild(metaData);
    rowContent.appendChild(viewBtn);
    // const itemCard=card('',[rowContent],transaction.amount<0?'expense':'income');
    container.appendChild(rowContent);
    container.appendChild(actionRow);
    });
    console.log(container);
    return container;
};