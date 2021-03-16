import React, { useState } from "react";
import Button from "./Button";
import Display from "./Display";
import Header from "./Header";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [mostVoted, setMostVoted] = useState(0);
  const [points, setPoints] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  const getRandomAnecdote = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const voteAnecdote = () => {
    const newPoints = { ...points };
    newPoints[selected] += 1;
    setPoints(newPoints);
    setMostVoted(newPoints[selected] > newPoints[mostVoted] ? selected : mostVoted);
  };

  return (
    <div>
      <Header title="Anecdote of the day" />
      <Display text={anecdotes[selected]} />
      <Button name="vote" handleClick={voteAnecdote} />
      <Button name="next anecdote" handleClick={getRandomAnecdote} />
      <Header title="Anecdote with most votes" />
      <Display text={anecdotes[mostVoted]} />
    </div>
  );
};

export default App;
