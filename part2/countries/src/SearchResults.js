import React from "react";
import CountriesList from "./CountriesList";
import CountryInfo from "./CountryInfo";

const SearchResults = ({ countries }) => {
  const countResults = countries.length;

  switch (true) {
    case countResults === 1:
      let country = countries[0];
      return <CountryInfo country={country} />;
    case countResults > 10:
      return <div>Too many matches, specify another filter</div>;
    case countResults <= 10:
      return <CountriesList countries={countries} />;
    default:
      return <div></div>;
  }
};

export default SearchResults;
