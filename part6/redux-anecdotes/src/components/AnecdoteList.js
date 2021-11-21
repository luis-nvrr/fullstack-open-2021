import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Anecdote from "./Anecdote";
import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdotes = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) =>
    filter
      ? state.anecdotes.filter((a) => a.content.toLowerCase().includes(filter))
      : state.anecdotes
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    const voted = anecdotes.find((a) => a.id === id);
    dispatch(voteFor(voted));
    dispatch(setNotification(`you have voted '${voted.content}'`, 5));
  };

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
        ))}
    </div>
  );
};

export default Anecdotes;
