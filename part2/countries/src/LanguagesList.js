import React from "react";
import LanguageItem from "./LanguageItem";

const LanguagesList = ({ languages }) => {
  return (
    <div>
      <h3>Spoken languages</h3>
      <ul>
        {languages.map((language) => (
          <LanguageItem name={language.name} key={language.name} />
        ))}
      </ul>
    </div>
  );
};

export default LanguagesList;
