export const Button = ({ text, onClick, className = '' }) => {
    const btn = document.createElement('button');
    btn.textContent = text;
    if (className)
        btn.className = className.trim();
    if (onClick)
        btn.addEventListener('click', (e) => {
            onClick(e);
        });
    return btn;

}
export const card = (title, children, className = '') => {
    const card = document.createElement('div');
    if (className)
        card.className = className.trim();
    if (title) {
        const h4 = document.createElement('h4');
        h4.textContent = title;
        card.appendChild(h4);
    }
    if (children) {
        if (Array.isArray(children)) {
            children.forEach(child => card.append(child));
        }
        else {
            card.appendChild(children);
        }
    }
    return card;
}

export const TransactionFormModal = ({ title, initialData = null, onSave, onClose }) => {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
        else if (e.key === 'Enter') {
            e.preventDefault();
            if (!dInput.value || !descrInput.value || !aInput.value)
                alert("please fill all the field ");
            else {
                onSave({
                    date: dInput.value,
                    catogory: select.value,
                    description: descrInput.value,
                    amount: parseFloat(aInput.value)
                });

                overlayContainer.remove();
            }
        }
    });
    const overlayContainer = document.createElement('div');
    overlayContainer.classList.add("overlay-container", 'display');
    const span = document.createElement('span');
    span.innerText = title;
    const closeBtn = Button({ text: 'close', onClick: onClose, className: 'close' });
    const overlayHead = card('', [span, closeBtn], 'overlay-head');

    const dlabel = document.createElement('label');
    dlabel.innerText = 'Date:';
    const dInput = document.createElement('input');
    dInput.type = 'date';
    dInput.id = 'date';
    dInput.required = true;
    if (initialData) dInput.value = initialData.date || '';
    const date = card('', [dlabel, dInput], 'date');

    const types = ['Food', 'Rent', 'Travel', 'Income', 'Shopping']
    const slabel = document.createElement('label');
    slabel.innerText = 'Catogory:';
    const select = document.createElement('select');
    select.id = 'catogory';
    select.name = 'catogory';
    select.required = true;
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        if (initialData && initialData.catogory === type) option.selected = true;
        select.appendChild(option);
    })
    const catogory = card('', [slabel, select], 'catogory');

    const descrlabel = document.createElement('label');
    descrlabel.innerText = 'Description:';
    const descrInput = document.createElement('input');
    descrInput.type = 'text';
    descrInput.id = 'description';
    descrInput.required = true;
    descrInput.placeholder = 'buy new black hand bag';
    if (initialData) descrInput.value = initialData.description || '';
    const description = card('', [descrlabel, descrInput], 'description');

    const alabel = document.createElement('label');
    alabel.innerText = 'Amount:';
    const aInput = document.createElement('input');
    aInput.type = 'text';
    aInput.id = 'amount';
    aInput.required = true;
    aInput.placeholder = '+ve for reveneue -ve for expense';
    if (initialData) aInput.value = initialData.amount ?? '';
    const amount = card('', [alabel, aInput], 'amount');

    const formElement = document.createElement('form');

    const submitBtn = document.createElement('button');
    submitBtn.type = "submit";
    submitBtn.textContent = initialData ? "Save Changes" : "Submit";
    const submit = card('', [submitBtn], 'button');

    formElement.append(date, catogory, description, amount, submit);

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        onSave({
            date: dInput.value,
            catogory: select.value,
            description: descrInput.value,
            amount: parseFloat(aInput.value)
        });

        overlayContainer.remove();
    });

    const overlay = card('', [overlayHead, formElement], 'overlay');
    overlayContainer.appendChild(overlay);

    return overlayContainer;
};

