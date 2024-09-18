import React, { useEffect, useRef, useState } from "react";


function Weather(props){
    const APP_ID = "afe68419336c8aa2a68890f768e106e8";
    const [Data,setData] = useState({});
    const [loading,setLoad] = useState(false);
    const inputRef = useRef();
   async function search(city){
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APP_ID }`;
            setLoad(true)
            const res = await fetch(url);
            const data =await res.json();
            console.log(data);
            setData({
                name: data.name,
                temp: Math.floor(data.main.temp),
                icon: ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                desc: data.weather[0].main,
                humidity: data.main.humidity,
                speed: Math.floor(data.wind.speed)
            })
            setLoad(false)
        }
        catch (error){
            alert("Wrong country name");
        } 
    }
    useEffect(() =>{
        search("london")
    },[])
    return(
        <div className="main"> 
            {loading==false?
            <div className="container">
            <div className="heading">
                <input ref={inputRef} className="input" type="text" placeholder="enter city name" ></input>
                <button onClick={()=>{search(inputRef.current.value)}}>search</button>
            </div>
            <div className="image">
                <img src={Data.icon}/>
                <h3>{Data.desc}</h3>
                <h1>{Data.name}</h1>
                <h1>{Data.temp} °C</h1>
                
            </div>
            <div className="bottom">
                <h3>humidity: {Data.humidity}</h3>
                <h3>wind speed: {Data.speed}</h3>
            </div>
        </div>
        :
            <h1 className="load">Loading</h1>
            }
        </div>
    )
}

export default Weather;