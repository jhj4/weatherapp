import React, { useState } from 'react'
import API_KEY from '../keys';
import { AppBar, TextField, Button, FormControl, List, ListItem } from '@material-ui/core';

function Weather({setLoc}) {
    const [weather, setWeather] = useState(null);

    function isNumeric(str) {
        if (typeof str != "string") return false 
        return !isNaN(str) && 
               !isNaN(parseFloat(str)) 
      }

    const fetchData = (zip) => {
        const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    
        if (isNumeric(zip)) {
            url.searchParams.append("zip", zip);
        }
        else {
            url.searchParams.append("q", zip);
        }
        url.searchParams.append("appid", API_KEY);
        url.searchParams.append("units", "imperial");
        fetch(url)
        .then(resp => {
            return resp.json();
        })
        .then(obj => {
            setWeather(obj);
        })
    }

    const getZip = () => {
        var input = document.getElementById('in').value;
        fetchData(input);
    }

    //{JSON.stringify(weather, undefined, 4)}

    if (weather !== null) {
        setLoc(weather.coord);
    }

    return (
        <div>
            <AppBar color="primary" style={{ alignItems: "center", paddingTop: "10px", paddingBottom: "10px", fontSize: "30px" }}>Weather App</AppBar>
            
            {/*<div style={{marginTop: "100px"}}>
                <label>
                    Zipcode: 
                    <input id='in' type='text'/>
                    <input type='submit' onClick={getZip}/>
                </label>
                </div>*/}
            <div></div>
            <div style={{ paddingTop: "80px", textAlign: "center" }}>
                <FormControl>
                    <TextField label="Zipcode: " id="in"/>
                    <Button type='submit' onClick={getZip}>Get Weather</Button>
                </FormControl>
            </div>

            {/*weather !== null && 
                <div style={{ paddingLeft: "40%", textAlign: "left" }}>
                    <h1 style={{ fontSize: "20px" }} >Weather:</h1><p>{JSON.stringify(weather.weather[0].description, undefined, 4)}</p>
                    <label>Temperature: <p>{JSON.stringify(weather.main.temp, undefined, 4)}</p></label>
                    <label>Feels like: <p>{JSON.stringify(weather.main.feels_like, undefined, 4)}</p></label>
                    <label>Low: <p>{JSON.stringify(weather.main.temp_min, undefined, 4)}</p></label>
                    <label>High: <p>{JSON.stringify(weather.main.temp_max, undefined, 4)}</p></label>
                    <label>Humidity: <p>{JSON.stringify(weather.main.humidity, undefined, 4)}</p></label>
                </div>*/
            }
            {weather !== null && 
                <div>
                    <h1 style={{ textAlign: "center" }}>Current Weather: </h1>
                    <List style={{ backgroundColor: "#00FF7F", left: '37%', borderRadius: '15px', width: '25%'}} >
                        <ListItem>Description: {JSON.stringify(weather.weather[0].description, undefined, 4)}</ListItem>
                        <ListItem>Temperature: {JSON.stringify(weather.main.temp, undefined, 4)}</ListItem>
                        <ListItem>Feels like: {JSON.stringify(weather.main.feels_like, undefined, 4)}</ListItem>
                        <ListItem>Low: {JSON.stringify(weather.main.temp_min, undefined, 4)}</ListItem>
                        <ListItem>High: {JSON.stringify(weather.main.temp_max, undefined, 4)}</ListItem>
                        <ListItem>Humidity: {JSON.stringify(weather.main.humidity, undefined, 4)}</ListItem>
                    </List>
                </div>
            }
        </div>
    )
}

export default Weather
