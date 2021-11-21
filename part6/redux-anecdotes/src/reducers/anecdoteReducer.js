import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      let voted = action.data.anecdote;
      return state.map((a) => (a.id === voted.id ? voted : a));

    case "CREATE":
      let newAnecdote = action.data.anecdote;
      return [...state, newAnecdote];

    case "INITIALIZE":
      return action.data.anecdotes;

    default:
      return state;
  }
};

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const anecdoteToVote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const voted = await anecdoteService.update(anecdoteToVote);
    dispatch({
      type: "VOTE",
      data: { anecdote: voted },
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdoteToCreate = { content, votes: 0 };
    const created = await anecdoteService.create(anecdoteToCreate);
    dispatch({
      type: "CREATE",
      data: {
        anecdote: created,
      },
    });
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INITIALIZE",
      data: { anecdotes },
    });
  };
};

export default reducer;
