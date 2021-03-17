import React from "react";

const WeatherInfo = ({ weather }) => {
  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <div>
        <b>Temperature: </b>
        {weather.current.temperature} Celcius
      </div>
      <img
        src={weather.current.weather_icons[0]}
        alt={weather.current.weather_descriptions[0]}
        width="90"
        height="90"
      />
      <div>
        <b>Wind: </b>
        {weather.current.wind_speed} km/h direction {weather.current.wind_dir}
      </div>
    </div>
  );
};

export default WeatherInfo;
