import React, { useState } from "react";
import './App.css';
import Hourly from "./components/Hourly";
import API_KEY from './keys';
import Weather from "./components/Weather";
import Zipform from "./ZipForm";
import Forecast from "./components/Forecast";

function App() {
  
  /*useEffect(() => {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");

    url.searchParams.append("appid", API_KEY);
    url.searchParams.append("zip", 22904);
    url.searchParams.append("units", "imperial");
    fetch(url)
      .then(resp => {
        return resp.json();
      })
      .then(obj => {
      setWeather(obj);
    })
  }, []);*/



  //console.log(weather.main);

//<pre>{JSON.stringify(weather, undefined, 4)}</pre>
      //<div>{}</div>
      //<Zipform/>

  const [loc, setLoc] = useState("");

  return (
    <div>
      <Weather setLoc={setLoc} />
      <Forecast loc={loc} />
    </div>
  );
}

export default App;
