import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <div>
      <h3>User info</h3>
      <form onSubmit={handleLogout}>
        <div>{user.name} is logged in</div>
        <button id="logout-button" type="submit">
          logout
        </button>
      </form>
    </div>
  )
}

export default Logout
