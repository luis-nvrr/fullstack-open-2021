import React, { useState } from "react";
import Button from "./Button";
import CountryInfo from "./CountryInfo";

const CountryItem = ({ country }) => {
  const [clicked, setClicked] = useState(false);

  const showInfo = () => {
    setClicked(!clicked);
  };

  if (clicked) {
    return (
      <div>
        <CountryInfo country={country} />
      </div>
    );
  }

  return (
    <div>
      {country.name} <Button text="show" onClick={showInfo} />
    </div>
  );
};

export default CountryItem;
