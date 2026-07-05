const  url='https://jsonplaceholder.typicode.com/posts';
// fetch(url).then((resolve)=>{console.log(resolve.status);console.log(resolve.headers);}).catch((error)=>console.log(error));
// class Http_Error extends Error{
//     constructor(message){
//         super(message);
//         this.name='HTTP_Error';
//     }
// }
// async function fetchJSON(url,options){
//     try{
//     const response=await fetch(url);
//     if(!response.ok){
//         throw new Http_Error("could n't fetch the resources")
//     }
//     console.log(response);
//     }
//     catch(error)
//     {
//         console.log(error);
//     }
// }
// fetchJSON(url,{methode:"GET"});
// let option={
//     method:"POST",
//     headers:{
//         'content-Type':'application/json'
//     },
//     body:JSON.stringify({
//         name:'Akhil',
//         job:'software Engineer',
//         Age:25
//     })
// };
// fetch(url,option).then(res=>{
//     if(!res.ok){
//         console.log("error");
//         return;
//     }
//     return res.json();
// }).then((data)=>{console.log(data);}).catch(error=>console.log(error));
async function aboutController(){
let controller=new AbortController();
const timer=setTimeout(()=>controller.abort(),2);
try{
    const result=await fetch(url,{signal:controller.signal});
    const data=await result.json();
    console.log(data)
    clearTimeout(timer)
}
catch(e){
if(e.name=="AbortError")
{
    console.log("Time out reached")
}
else
{
    console.log("other network issue");
}
}
}
aboutController();