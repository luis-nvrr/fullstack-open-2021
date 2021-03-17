import React from "react";

const GeneralCountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital} </div>
      <div>Population: {country.population}</div>
    </div>
  );
};

export default GeneralCountryInfo;
