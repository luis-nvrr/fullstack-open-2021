import React from "react";

const Notification = ({ message }) => {
  const style = { marginTop: 10, marginBottom: 10 };
  return (
    <div style={style}>{message ? <div>{message}</div> : <div></div>}</div>
  );
};

export default Notification;
