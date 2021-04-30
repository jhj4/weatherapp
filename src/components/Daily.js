import React, { useState } from 'react'
import API_KEY from '../keys';
import { List, ListItem } from '@material-ui/core';
import { WiDaySunny, WiCloud, WiRain, WiThunderstorm, WiSnow, WiShowers, WiCloudRefresh } from "weather-icons-react";

function Daily(props) {
    const [daily, setDaily] = useState(null);
    const fetchDaily = (lon, lat) => {
        const url = new URL("https://api.openweathermap.org/data/2.5/onecall");
        url.searchParams.append("lon", lon);
        url.searchParams.append("lat", lat);
        url.searchParams.append("appid", API_KEY);
        url.searchParams.append("units", "imperial");
        url.searchParams.append("exclude", "hourly,current,minutely");

        fetch(url)
        .then(resp => {
            return resp.json();
        })
        .then(obj => {
            setDaily(obj);
        });
    }

    if (props.loc.loc !== "" && daily === null) {
        fetchDaily(props.loc.loc.lon, props.loc.loc.lat);
    }

    var days = [];
    if (daily !== null) {
        for (var i = 0; i < 8; i++) {
            var icon;
            var main = JSON.stringify(daily.daily[i].weather[0].main);
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
            days.push(<div>
                <List style={{ left: '37%', borderRadius: '15px', backgroundColor: '#F08080', width: '25%'}} >
                    {icon}
                    <ListItem>Description: {JSON.stringify(daily.daily[i].weather[0].description, undefined, 4)}</ListItem>
                    <ListItem>Low: {JSON.stringify(daily.daily[i].temp.min, undefined, 4)}</ListItem>
                    <ListItem>High: {JSON.stringify(daily.daily[i].temp.max, undefined, 4)}</ListItem>
                    <ListItem>Morning Temperature: {JSON.stringify(daily.daily[i].temp.morn, undefined, 4)}</ListItem>
                    <ListItem>Day Temperature: {JSON.stringify(daily.daily[i].temp.day, undefined, 4)}</ListItem>
                    <ListItem>Evening Temperature: {JSON.stringify(daily.daily[i].temp.eve, undefined, 4)}</ListItem>
                    <ListItem>Night Temperature: {JSON.stringify(daily.daily[i].temp.night, undefined, 4)}</ListItem>
                    <ListItem>Morning feels like: {JSON.stringify(daily.daily[i].feels_like.morn, undefined, 4)}</ListItem>
                    <ListItem>Day feels like: {JSON.stringify(daily.daily[i].feels_like.day, undefined, 4)}</ListItem>
                    <ListItem>Evening feels like: {JSON.stringify(daily.daily[i].feels_like.eve, undefined, 4)}</ListItem>
                    <ListItem>Night feels like: {JSON.stringify(daily.daily[i].feels_like.night, undefined, 4)}</ListItem>
                    <ListItem>Humidity: {JSON.stringify(daily.daily[i].humidity, undefined, 4)}</ListItem>
                    <ListItem>Wind Speed: {JSON.stringify(daily.daily[i].wind_speed, undefined, 4)}</ListItem>
                </List><br/>
            </div>);
        }
    }

    return (
        <div>
            <br/>
            {daily !== null && days}
        </div>
    )
}

export default Daily
