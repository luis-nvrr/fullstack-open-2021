import axios from "axios";
import React, { useState, useEffect } from "react";
import GeneralCountryInfo from "./GeneralCountryInfo";
import LanguagesList from "./LanguagesList";
import WeatherInfo from "./WeatherInfo";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(false);

  useEffect(() => {
    axios
      .get(
        "http://api.weatherstack.com/current?access_key=" +
          process.env.REACT_APP_API_KEY +
          "&query=" +
          country.capital
      )
      .then((response) => setWeather(response.data));
  }, [country]);

  if (!weather) {
    return <div></div>;
  }

  return (
    <div>
      <GeneralCountryInfo country={country} />
      <LanguagesList languages={country.languages} />
      <img src={country.flag} alt={country.name} width="130" height="100" />
      <WeatherInfo weather={weather} />
    </div>
  );
};

export default CountryInfo;
