import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  const total = parts.reduce((a, b) => {
    return a + b.exercises;
  }, 0);

  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      ))}
      <b>total of {total} exercises</b>
    </div>
  );
};

export default Content;
