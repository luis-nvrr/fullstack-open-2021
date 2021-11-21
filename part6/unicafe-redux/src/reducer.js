const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let oldGood = state.good;
      return {...state, good:oldGood+1}
    case 'OK':
      let oldOk = state.ok;
      return {...state, ok:oldOk+1}
    case 'BAD':
      let oldBad = state.bad;
      return {...state, bad:oldBad+1}
    case 'ZERO':
      return {...initialState}
    default: return state
  }
  
}

export default counterReducer