import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import SearchResults from "./SearchResults";

const App = () => {
  const [countries, setCountries] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleSearchChange = (event) => {
    let searched = event.target.value;
    setSearch(searched);
    filterCountries(searched);
  };

  const filterCountries = (searched) => {
    let searchresults = countries.filter((country) =>
      country.name.toLowerCase().includes(searched.toLowerCase())
    );
    setResults(searchresults);
  };

  if (!countries) {
    return <div></div>;
  }

  return (
    <div>
      <h1>Search countries</h1>
      <Search value={search} onChange={handleSearchChange} />
      <h1>Results</h1>
      <SearchResults countries={results} />
    </div>
  );
};

export default App;
