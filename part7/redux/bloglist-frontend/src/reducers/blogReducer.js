import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  console.log(state, action)
  switch (action.type) {
    case 'INITIALIZE':
      return action.payload.blogs

    case 'CREATE':
      return [...state, action.payload.blog]

    default:
      return state
  }
}

export const initialize = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE',
      payload: { blogs }
    })
  }
}

export const createBlog = (blogToBeCreated) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blogToBeCreated)
      dispatch({
        type: 'CREATE',
        payload: { blog: createdBlog }
      })
      dispatch(setNotification('Blog created successfully', 'success', 5))
    } catch (error) {
      // eslint-disable-next-line quotes
      dispatch(setNotification("Blog couldn't be created", 'error', 5))
    }
  }
}

export default reducer
