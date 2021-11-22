import React from "react";
import Country from "./components/Country";
import { useField, useCountry } from "./hooks";

const App = () => {
  const nameInput = useField("text");
  const [country, setName] = useCountry();

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">find</button>
      </form>
      <Country country={country} />
    </div>
  );
};

export default App;
