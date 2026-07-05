const CartLogic={
    create(items=[],coupon=null){
        return {items,coupon};
    },
    addItem(cart,p){
        const exists=cart.items.find(item=>item.id===p.id);
        let newItems;
        if(exists){
            newItems=cart.items.map(item=>item.id===p.id?{...item,quantity:item.quantity+1}:item);
        }
        else{
            newItems=[...cart.items,{...p,quantity:1}];
        }
        return {...cart,items:newItems};
    },
    removeItem(cart,id){
        return {...cart,items:cart.items.filter(item=>item.id!==id)};
    },
    updateQuantity(cart,id,quantity){
        if(quantity<=0){
            return this.removeItem(cart,id);
        }
        return{...cart,items:cart.items.map(item=>item.id===id?{...item,quantity:quantity}:item)};
    },
    applyCoupon(cart,couponCode){
        return{...cart,coupon:couponCode};
    },
    getTotal(cart){
        const total=cart.items.reduce((sum,item)=>{
            return sum+(item.price*item.quantity);
        },0);
        let discount=0;
        if(cart.coupon=='SAVE10')
            discount=0.20;
        if(cart.coupon=='SAVE50')
            discount=0.50
        return total*(1-discount);
    }
};
class CartStore{
    constructor(){
        this.observers=[];
        this.history=[];
        this.state=CartLogic.create();
    }
    getState(){
        return this.state;
    }
    addObserver(fn){
        this.observers.push(fn)
    }
    notifyObservers(){
        this.observers.forEach(fn=>fn(this.state));
    }
    setState(nextState){
        this.history.push(this.state);
        this.state=nextState;
        this.notifyObservers();
    }
    addItem(product){
        this.setState(CartLogic.addItem(this.state,product));
    }
    removeItem(id){
        this.setState(CartLogic.removeItem(this.state,id))
    }
    updateQuantity(id,quantity){
        this.setState(CartLogic.updateQuantity(this.state,id,quantity));
    }
    applyCoupon(code){
        this.setState(CartLogic.applyCoupon(this.state,code));
    }
    undo(){
        if(this.history.length ===0)
            return;
        this.state=this.history.pop();
        this.notifyObservers();
    }
}
const store=new CartStore();

document.addEventListener("DOMContentLoaded",()=>{
    const buttons=document.querySelectorAll('.button');
    buttons.forEach(button=>{
        button.addEventListener('click',(event)=>{
            const clickedBtn=event.target;
            const pId=parseInt(clickedBtn.dataset.id,10);
            const pName=clickedBtn.dataset.name;
            const pPrice=parseFloat(clickedBtn.dataset.price);
            const targetProduct={
                id:pId,
                name:pName,
                price:pPrice
            };
            store.addItem(targetProduct);
        });
    });
    const undoBtn=document.getElementById('undoBtn');
    if(undoBtn){
        undoBtn.addEventListener('click',()=>{
            store.undo();
        });
    }
    store.notifyObservers();
});
function renderCartToDOM(state){
    const cartContainer=document.getElementById('cart-root');
    cartContainer.innerHTML='';
    if(state.items.length===0)
    {
        const emptyMsg=document.createElement('p');
        emptyMsg.textContent="Cart is Empty";
        emptyMsg.classList.add('emptyMsg');
        cartContainer.appendChild(emptyMsg);
        return;
    }
    const listWrapper=document.createElement('div');
    listWrapper.classList.add('items-list');
    state.items.forEach(item=>{
        const itemCard=document.createElement('div');
        itemCard.classList.add('item');
        const info=document.createElement('div');
        info.classList.add("add-info");
        info.textContent=`${item.name}-$${item.price} each`;
        itemCard.appendChild(info);
        const control=document.createElement('div');
        control.classList.add('qty-control');
        const minusButton=document.createElement('button');
        minusButton.textContent='-';
        minusButton.addEventListener('click',()=>{
            store.updateQuantity(item.id,item.quantity-1);
        });
        const qty=document.createElement('span');
        qty.textContent=item.quantity;
        qty.classList.add('count');
        const plusButton=document.createElement('button');
        plusButton.textContent='+';
        plusButton.addEventListener('click',()=>{
            store.updateQuantity(item.id,item.quantity+1);
        });
        const remButton=document.createElement('button');
        remButton.textContent="Remove";
        remButton.classList.add('rmbutton')
        remButton.addEventListener('click',()=>{
            store.removeItem(item.id);
        });
        control.appendChild(minusButton);
        control.appendChild(qty);
        control.appendChild(plusButton);
        control.appendChild(remButton);
        itemCard.appendChild(control);
        listWrapper.appendChild(itemCard);
    });

    const summary=document.createElement('div');
    const cartTotal=CartLogic.getTotal(state);
    const heading=document.createElement('h3');
    heading.textContent=`Total Payable:$${cartTotal.toFixed(2)}`;
    cartContainer.appendChild(listWrapper);
    cartContainer.appendChild(heading);
}
store.addObserver(renderCartToDOM);
store.addObserver(latestState=>{
    localStorage.setItem('CART',JSON.stringify(latestState));
});
store.addObserver(()=>{
    const undoBtn=document.getElementById('undoBtn');
     if (!undoBtn) return; 
    undoBtn.disabled=(store.history.length===0);
});
