let timer;

const reducer = (state = "No notificacions", action) => {
  switch (action.type) {
    case "CREATE_NOTIFICATION":
      let message = action.data.message;
      return message;

    case "DELETE_NOTIFICATION":
      return "No notifications";

    default:
      return state;
  }
};

export const setNotification = (message, time) => {
  if (timer) {
    clearTimeout(timer);
  }

  return (dispatch) => {
    dispatch({
      type: "CREATE_NOTIFICATION",
      data: { message },
    });

    timer = setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

const removeNotification = () => {
  return {
    type: "DELETE_NOTIFICATION",
  };
};
export default reducer;
