let timer

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      return { message: action.data.message, type: action.data.type }

    case 'DELETE_NOTIFICATION':
      return {}

    default:
      return state
  }
}

export const setNotification = (message, type, time) => {
  if (timer) {
    clearTimeout(timer)
  }

  return (dispatch) => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: { message, type }
    })

    timer = setTimeout(() => {
      dispatch(removeNotification())
      console.log('remove')
    }, time * 1000)
  }
}

const removeNotification = () => {
  return {
    type: 'DELETE_NOTIFICATION'
  }
}
export default reducer
