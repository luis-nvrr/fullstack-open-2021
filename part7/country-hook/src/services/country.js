import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1";

const getInfo = async (name) => {
  const response = await axios.get(`${baseUrl}/name/${name}?fullText=true`);
  return response.data;
};

export default { getInfo };
