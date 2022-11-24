import _ from "lodash";
import "./style.css";
import clouds from "./clouds.png";
import clear from "./clear.png";
import drizzle from "./drizzle.png";
import mist from "./mist.png";
import overcast from "./overcastclouds.png";
import rain from "./rain.png";
import shower from "./showerrain.png";
import snow from "./snow.png";
import thunder from "./thunderstorm.png";

const weatherApp =(async() =>{

    const storage = (a,b,c,d,e) => {
        const condition = a;
        const description = b;
        const currentTemp = c;
        const maxTemp = d;
        const minTemp = e;

        return{condition,description,currentTemp,maxTemp,minTemp}
    };

    const index = () =>{
        const mainCon = document.createElement("div");
        mainCon.setAttribute("id","mainCon");
    
        const searchCon = document.createElement("div");
        searchCon.setAttribute("id","searchCon");
    
        const displayCon = document.createElement("div");
        displayCon.setAttribute("id","displayCon");
    
        mainCon.append(searchCon, displayCon)
        document.querySelector("body").append(mainCon)
    };

    const search = () =>{
        const searchCon = document.getElementById("searchCon");
        
        const searchBar = document.createElement("input");
        searchBar.setAttribute("id","searchBar");
        searchBar.classList.add("search");
        searchBar.setAttribute("placeholder","City Name...");

        const searchButton = document.createElement("button");
        searchButton.setAttribute("id","searchButton");
        searchButton.classList.add("search");
        searchButton.textContent = "Search";

        searchButton.addEventListener("click", ()=>{
            try{
                weather(searchBar.value).then(data=>{
                    document.querySelector("#description").textContent = data.description;
                    document.querySelector("#currentTemp").textContent = Math.round(data.currentTemp);
                    document.querySelector("#maxTemp").textContent = Math.round(data.maxTemp);
                    document.querySelector("#minTemp").textContent = Math.round(data.minTemp);
                    console.log(data.condition)
                    switch(data.condition.toLowerCase()){
                        case "clouds":
                            document.querySelector("#condition").src = clouds;
                            break;
                        case "clear":
                            document.querySelector("#condition").src = clear;
                            break;
                        case "mist":
                            document.querySelector("#condition").src = mist;
                            break;
                        case "drizzle":
                            document.querySelector("#condition").src = drizzle;
                            break;
                        case "overcast":
                            document.querySelector("#condition").src = overcast;
                            break;
                        case "rain":
                            document.querySelector("#condition").src = rain;
                            break;
                        case "showerrain":
                            document.querySelector("#condition").src = shower;
                            break;
                        case "thunderstorm":
                            document.querySelector("#condition").src = thunder;
                            break;
                        case "snow":
                            document.querySelector("#condition").src = snow;
                            break;
                        default:
                            document.querySelector("#condition").setAttribute("src", "./"+data.condition.toLowerCase()+".png")
                    }
                })
            } catch(err){
                console.error(err);
            }
        })

        searchCon.append(searchBar,searchButton)
    }

    const display = () =>{
        const displayCon = document.getElementById("displayCon");
        
        const condition = document.createElement("img");
        condition.setAttribute("id","condition")
        const description = document.createElement("div");
        description.setAttribute("id","description")
        const currentTemp = document.createElement("div");
        currentTemp.setAttribute("id","currentTemp")
        const maxTemp = document.createElement("div");
        maxTemp.setAttribute("id","maxTemp")
        const minTemp = document.createElement("div");
        minTemp.setAttribute("id","minTemp")
        
        
       

        displayCon.append(condition, description,currentTemp,maxTemp,minTemp)
    }

    const weather = async(x) =>{
        try{
            const res = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+x+"&APPID=902371abb86ec8980fb49a09f7b3c8e9&units=metric ",{mode:"cors"})
            const data = await res.json()
            let current = storage(data.weather[0].main,data.weather[0].description, data.main.temp, data.main.temp_max, data.main.temp_min)
            return current 
        } catch(err){
            console.error(err)
        }
    };

    try{
        index();
        search();
        display();
        
    } catch(err){
        console.error(err);
    }
})();



