import React from "react";

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
