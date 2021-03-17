import React from "react";
import CountryItem from "./CountryItem";

const CountriesList = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <CountryItem country={country} key={country.numericCode} />
      ))}
    </div>
  );
};

export default CountriesList;
