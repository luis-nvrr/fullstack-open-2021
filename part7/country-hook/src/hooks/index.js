import { useState, useEffect } from "react";
import countryService from "../services/country";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const data = await countryService.getInfo(name);
        const countryFound = data[0];
        setCountry({ found: true, data: countryFound });
      } catch (error) {
        setCountry({ found: false });
      }
    };

    getInfo();
  }, [name]);

  return [country, setName];
};
