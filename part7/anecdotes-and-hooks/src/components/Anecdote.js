import React from "react";

const Anecdote = ({ anecdote }) => {
  const style = { marginTop: 10, marginBottom: 10 };
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div style={style}>{`has ${anecdote.votes} votes`}</div>
      <div style={style}>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  );
};

export default Anecdote;
