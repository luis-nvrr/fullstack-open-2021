import React from "react";
import Person from "./Person";

const PersonsList = ({ personsArray, onDelete }) => {
  return (
    <div>
      {personsArray.map((person) => (
        <Person
          name={person.name}
          number={person.number}
          key={person.name}
          id={person.id}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PersonsList;
