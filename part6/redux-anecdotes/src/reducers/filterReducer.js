const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.data.filter;

    default:
      return "";
  }
};

export const changeFilter = (filter) => {
  return {
    type: "SET_FILTER",
    data: { filter },
  };
};

export default reducer;
