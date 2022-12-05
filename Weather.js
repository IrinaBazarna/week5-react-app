import React, { useState } from "react";
import WeatherDate from "./WeatherDate";
import axios from "axios";


function WeatherInf(props) {
  const [city, setCity] = useState(props.city);
  const [weather, setWeather] = useState({ ready: false });

  function weatherDate(response) {
    setWeather({
      ready: true,
      city: response.city,
      temperature: response.temperature.current,
      wind: response.wind.speed,
      humidity: response.temperature.humidity,
      icon_url:
        "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-night.png",
      description: response.condition.description,
    });
  }
  function handleSubmit(event) {
    search();
    weatherDate();
  }
  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function search() {
 
    const apiKey = "5b78a3odfaab869b543t250cfd808b8e";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleSubmit);
  }

  let form = (
    <div className="Weather">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              placeholder="Type a city"
              onChange={updateCity}
              className="form-control"
              autoFocus="on"
            />
          </div>
          <div className="col-3">
            <input type="submit" value="Search" className="btn" />
          </div>
        </div>
      </form>
    </div>
  );

  if (weather.ready) {
    return (
      <div>
        {form}
        <WeatherDate data={weather} />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
export default WeatherInf;
