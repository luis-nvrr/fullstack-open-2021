import React from "react";

const Person = ({ name, number, id, onDelete }) => {
  return (
    <div>
      {name} {number} <button onClick={onDelete(id)}>delete</button>
    </div>
  );
};

export default Person;
