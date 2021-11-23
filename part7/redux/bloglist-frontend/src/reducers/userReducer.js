import userService from '../services/user'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_USERS':
      return action.payload.users
    default:
      return state
  }
}

export const initialize = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({ type: 'INITIALIZE_USERS', payload: { users } })
  }
}

export default reducer
