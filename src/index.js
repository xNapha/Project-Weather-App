import _ from "lodash";

const weather = async() =>{
    try{
        const res = await fetch("https://api.openweathermap.org/data/2.5/weather?q=London&APPID=902371abb86ec8980fb49a09f7b3c8e9&units=metric ",{mode:"cors"})
        const data = await res.json()
        console.log(data)
    } catch(err){
        console.error(err)
    } 
};

weather()


