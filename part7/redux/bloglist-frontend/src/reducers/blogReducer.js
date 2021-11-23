import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.payload.blogs

    case 'CREATE':
      return [...state, action.payload.blog]

    case 'DELETE':
      return state.filter((blog) => blog.id !== action.payload.blog.id)

    case 'LIKE':
      return state.map((blog) => (blog.id === action.payload.blog.id ? action.payload.blog : blog))

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

export const deleteBlog = (blogToBeDeleted) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogToBeDeleted)
      dispatch({
        type: 'DELETE',
        payload: { blog: blogToBeDeleted }
      })
      dispatch(setNotification('Blog deleted successfully', 'success', 5))
    } catch (exception) {
      // eslint-disable-next-line quotes
      dispatch(setNotification("Blog couldn't be deleted", 'error', 5))
    }
  }
}

export const likeBlog = (blogToBeLiked) => {
  return async (dispatch) => {
    try {
      const blogToUpdate = { likes: blogToBeLiked.likes++, ...blogToBeLiked }
      const likedBlog = await blogService.update(blogToUpdate)
      dispatch({ type: 'LIKE', payload: { blog: likedBlog } })
      dispatch(setNotification('Blog liked successfully', 'success', 5))
    } catch (exception) {
      // eslint-disable-next-line quotes
      dispatch(setNotification("Blog couldn't be liked", 'error', 5))
    }
  }
}

export default reducer
