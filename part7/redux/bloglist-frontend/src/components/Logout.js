import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'

const Logout = () => {
  const style = {
    display: 'inline-block'
  }
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <div style={style}>
      {user.name} is logged in{' '}
      <button type="button" onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default Logout
