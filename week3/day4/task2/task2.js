// let promise1=new Promise((resolve,reject)=>{
//     setTimeout(()=>resolve('accepted'),1000);
//     setTimeout(()=>reject("error"),0);
// })
// promise1.then((msg)=>console.log(msg)).catch((msg)=>console.log(msg));

// let promise2=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         let item=false;
//         if(item){
//             resolve("it is a true value");
//         }
//         else{
//             reject("The value is false");
//         }
//     },1000)
// })
// promise2.then((msg)=>console.log(msg)).catch((msg)=>console.log(msg));

// let promise3=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         let a=5;
//         let b=6;
//         let sum=11;
//         if(a+b===sum){
//             resolve("true");
//         }
//         else{
//             reject("false");
//         }
//     },0)
// })
// promise3.then((x)=>console.log(x)).catch((x)=>console.log(x))

// let promise4=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         let d=5;
//         if(d===6){
//             resolve("value true");
//         }
//         else{
//             reject(" value false");
//         }
//     },0)
// })
// promise4.then((x)=>console.log(x)).catch((x)=>console.log(x))

// let promise5=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//             resolve("true");
//             reject("false");
//     },0)
// })
// promise5.then((x)=>console.log(x)).catch((x)=>console.log(x))


// function getUser()
// {
//     return Promise.resolve({userId:101,name:'Ankitha'});
// }

// function getOrder(id)
// {
//    return new Promise((resolve,reject)=>{
//     if(!id){
//         reject("can't place order userid is undefined");
//         return;
//     }
//     resolve({orderId:4})
//    })
// }

// function getOrderDetail(order){
//     return  Promise.resolve({order_id:order.orderId,item:"book",price:50});
// }
// getUser().then((user)=>{
//     console.log(`User details:${user.userId},${user.name}`);
//     return getOrder(user.userId);
// }).then((order)=>{
//     console.log(`order placed successfully orderId:${order.orderId}`);
//     return getOrderDetail(order);
// }).then((details)=>{
//     console.log(`order-detals:${details.order_id} ${details.item} ${details.price}`);
// }).catch((err)=>{
//     console.log(err);
// })

const promise1=new Promise((resolve,reject)=>{
    setTimeout(()=>resolve("promise1 resolved"),3000)
    setTimeout(()=>reject("promise1 rejected"),4000)
})
const promise2=new Promise((resolve,reject)=>{
    setTimeout(()=>resolve("promise2 resolved"),2000)
    setTimeout(()=>reject("promise3 rejected"),4000)
})
const promise3=new Promise((resolve,reject)=>{
    setTimeout(()=>resolve("promise3 resolved"),1000)
    setTimeout(()=>reject("promise3 rejected"),4000)
})
Promise.all([promise1,promise2,promise3]).then((x)=>console.log(x)).catch((err)=>console.log(err));
// Promise.race([promise1,promise2,promise3]).then((x)=>console.log(x)).catch((er)=>console.log(er));
// Promise.allSettled([promise1,promise2,promise3]).then((x)=>console.log(x)).catch((er)=>console.log(er));
