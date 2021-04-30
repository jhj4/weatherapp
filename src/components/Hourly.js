import React, { useState } from 'react'
import API_KEY from '../keys';
import { List, ListItem } from '@material-ui/core';
import { WiDaySunny, WiCloud, WiRain, WiThunderstorm, WiSnow, WiShowers, WiCloudRefresh } from "weather-icons-react";

function Hourly(props) {
    const [hourly, setHourly] = useState(null);
    const fetchHourly = (lon, lat) => {
        const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
        url.searchParams.append("lon", lon);
        url.searchParams.append("lat", lat);
        url.searchParams.append("appid", API_KEY);
        url.searchParams.append("units", "imperial");
        url.searchParams.append("exclude", "current,minutely,daily");

        fetch(url)
        .then((resp) => {
            return resp.json();
        })
        .then((obj) => {
            setHourly(obj);
        });
    }

    if (props.loc.loc !== "" && hourly === null) {
        fetchHourly(props.loc.loc.lon, props.loc.loc.lat);
    }

    /*const [fetched, setFetched] = useState(false);
    
    const getZip = () => {
        var input = document.getElementById('in').value;
        fetchData(input);
        setFetched(true);
    }*/

    var hours = [];

    if (hourly !== null) {
        for (var i = 0; i < 48; i++) {
            var icon;
            var main = JSON.stringify(hourly.hourly[i].weather[0].main);
            if (main === "\"Clear\"") {
                icon = <WiDaySunny size={50} style={{ paddingLeft: "40%" }}/>;
            } 
            else if (main == "\"Clouds\"") {
                icon = <WiCloud size={50} style={{ paddingLeft: "40%" }}/>;
            }
            else if (main === "\"Drizzle\"") {
                icon = <WiShowers size={50} style={{ paddingLeft: "40%" }}/>;
            }
            else if (main === "\"Rain\"") {
                icon = <WiRain size={50} style={{ paddingLeft: "40%" }}/>;
            }
            else if (main === "\"Thunderstorm\"") {
                icon = <WiThunderstorm size={50} style={{ paddingLeft: "40%" }}/>;
            }
            else if (main === "\"Snow\"") {
                icon = <WiSnow size={50} style={{ paddingLeft: "40%" }}/>;
            }
            hours.push(<div>
                <List style={{ left: '37%', borderRadius: '15px', backgroundColor: '#20B2AA', width: '25%'}} >
                    {icon}
                    <ListItem>Description: {JSON.stringify(hourly.hourly[i].weather[0].description, undefined, 4)}</ListItem>
                    <ListItem>Temperature: {JSON.stringify(hourly.hourly[i].temp, undefined, 4)}</ListItem>
                    <ListItem>Feels like: {JSON.stringify(hourly.hourly[i].feels_like, undefined, 4)}</ListItem>
                    <ListItem>Humidity: {JSON.stringify(hourly.hourly[i].humidity, undefined, 4)}</ListItem>
                    <ListItem>Wind Speed: {JSON.stringify(hourly.hourly[i].wind_speed, undefined, 4)}</ListItem>
                </List><br/>
            </div>);
        }
    }

    return (
        <div>
            <br/>
            {hourly !== null && hours}
        </div>
    )
}

export default Hourly
