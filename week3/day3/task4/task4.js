const orders=[
    {id:101,items:["bag","pencil","book"]},
    {id:102,items:['oil','soap','shampoo']},
    {id:103,items:['laptop','mouse','keyboard']},
];
const orderdItems=orders.flatMap((order)=>
order.items.map(item=>(
    {item,ordId:order.id}))
    
)
console.log(orderdItems) 

const logs = [
  { level: 'info', msg: 'Started' },
  { level: 'error', msg: 'Database connection failed' },
  { level: 'error', msg: 'Reload' },
  { level: 'info', msg: 'Retrying...' }
];

const lastErrorIndex = logs.findLastIndex(log => log.level === 'error');
const lastErrorEntry = logs.findLast(log => log.level === 'error');
console.log(lastErrorEntry);
console.log(lastErrorIndex);
//chunk(arr,size)
Arr=[1,2,3,4,5,6,7,8];
size=2;
const chunk=(arr,size)=>
    Array.from({length:Math.ceil(arr.length/size)},(_,i)=>
        arr.slice(i*size,i*size+size)
    )
let chunkResult=chunk(Arr,size);
console.log(chunkResult);

//zip array
const zip = (...arrays) => 
 Array.from({ length: Math.max(...arrays.map(a => a.length)) }, (_, i) => 
    arrays.map(arr => arr[i])
  );
  let a=[1,5,3,7];
  let b=[2,7,4]
  let c=[3,7,3,8,9]
  let result=zip(a,b)
  console.log(result);
   const marks=[
    {"phy":40 ,"status":"fail"},
    {"chem":56, "status":"pass"},
    {"Bio":72 ,"status":"pass"},
    {"Eng":34 ,"status":"fail"},
    {"Math":20 ,"status":"fail"},
    {"malayalam":75,"status":"pass"}
  ]
 const groupBy=marks.reduce((acc,item)=>{
    const key=item.status;
    if(!acc[key]){
        acc[key]=[];
    }
    acc[key].push(item)
    return acc;
 },{});
 
const groupedResult=groupBy;
console.log(groupedResult);

//calander
const year=2026;
const months=Array.from({length:12},(_,monthIndex)=>{
    const date=new Date(year,monthIndex,1);
    return{
        month:date.toLocaleString('default',{month:'long'}),
        dayCount:new Date(year,monthIndex+1,0).getDate()
    };
});
console.log(months);