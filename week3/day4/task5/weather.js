// const data=document.getElementById('data');
// const loading=document.getElementById('load');
// async function getData(){
// try{
//  
//     const response=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true`)
//     if(!response.ok)
//     {
//         throw new Error(`Response status:${response.status}`)
//     }
//     const data=await response.json();
//     console.log(data.current_weather.temperature);
//     console.log(data.current_weather.windspeed);
//     console.log(data.current_weather.weathercode);
// }
// catch(e){
//     console.log(e.message);
// }
// }
// getData();
const TTL=10000;
const input=document.getElementById('input')
const data=document.getElementById('data');
const loading=document.getElementById('load');
const button=document.getElementById('btn');
const temp=document.getElementById('temp');
const wind=document.getElementById('wind');
const code=document.getElementById('code');
const Alert= document.getElementById('alert');
loading.setAttribute("hidden","");
data.setAttribute("hidden","");
async function getData(){
try{
    let name=input.value.trim();
    const response=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}`);
    if(!response.ok)
    {
        throw new Error(`Response status:${response.status}`)
    }
     loading.setAttribute("hidden","");
     Alert.setAttribute("hidden","");
     data.removeAttribute("hidden")
    const info=await response.json();
    const longitude=info.results[0].longitude;
    const latitude=info.results[0].latitude;
    const weather=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const weatherInfo=await weather.json();
    console.log(weatherInfo);
   let temperature=weatherInfo.current_weather.temperature;
   let windSpeed=weatherInfo.current_weather.windspeed;
   let weathercode=weatherInfo.current_weather.weathercode;
   storeValue(temperature,windSpeed,weathercode);
   console.log(temperature,windSpeed,weathercode);
    temp.innerText=temperature;
    wind.innerText=windSpeed;
    code.innerText=weathercode;
}
catch(e){
    data.setAttribute("hidden","");
   Alert.removeAttribute("hidden")
   loading.setAttribute('hidden',"")
}
}
button.addEventListener('click',(e)=>
    {e.preventDefault();
    getData();});
input.addEventListener('click',(e)=>{loading.removeAttribute("hidden");
 Alert.setAttribute("hidden","");
 data.setAttribute("hidden","");}
);

function storeValue(temperature,windSpeed,weathercode){
    sessionStorage.setItem("temperature",temperature);
    sessionStorage.setItem("windSpeed",windSpeed);
    sessionStorage.setItem("weatherCode",weathercode);
    sessionStorage.setItem("timeLimit",Date.now()+TTL)
}
function getValue(){
    time=sessionStorage.getItem("timeLimit");
    if(Date.now()<time){
        data.removeAttribute("hidden")
        temp.innerText=sessionStorage.getItem("temperature");
        wind.innerText=sessionStorage.getItem("windSpeed");
        code.innerText=sessionStorage.getItem("weatherCode");
    }
}
getValue();