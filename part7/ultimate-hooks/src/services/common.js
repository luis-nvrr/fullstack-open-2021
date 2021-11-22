import axios from "axios";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = (baseUrl) => async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = (baseUrl) => async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (baseUrl) => async (id, newObject) => {
  const response = await axios.put(`${baseUrl} /${id}`, newObject);
  return response.data;
};

export default { getAll, create, update, setToken };
