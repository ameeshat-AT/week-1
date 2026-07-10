const cartModule = (function () {
    let items = [];
    const addItem = function (product) {
        let index = items.findIndex(item => item.id === product.id);
        if (index > -1) {
            items[index].quantity += product.quantity;
        }
        else { items.push({ ...product }); }
    }
    const removeItem = function (id) {
        let index = items.findIndex(item => item.id === id);
        if (index > -1) {
            items.splice(index, 1);
        }
    }
    const updateQuantity = function (product) {
        let index = items.findIndex(item => item.id === product.id);
        if (index > -1 && product.quantity > 0) {
            items[index].quantity = product.quantity
        }
        else if (index > -1 && product.quantity <= 0) {
            let k = items.splice(index, 1);
        }
    }
    const getItems = function () {
        return items.map(item => item);

    }
    const getTotal = function () {
        return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }
    const clear = function () {
        items = [];
    }
    return {
        addItem, removeItem, updateQuantity, getItems, getTotal, clear
    };
})();

cartModule.addItem({ id: 102, name: "shoe", price: 250, quantity: 1 });
cartModule.addItem({ id: 103, name: "book", price: 50, quantity: 2 });
cartModule.addItem({ id: 104, name: "bottle", price: 200, quantity: 1 });
cartModule.addItem({ id: 105, name: "phone", price: 25000, quantity: 1 });
console.log(cartModule.getItems());
cartModule.updateQuantity({ id: 102, quantity: 2 });
console.log(cartModule.getItems());
cartModule.removeItem(104);
console.log(cartModule.getItems());
console.log(cartModule.getTotal());
// console.log(items);
// items[0].product="cake";

