import React from 'react'

const Logout = ({ user, handleLogout }) => {
  return (
    <div>
      <h3>User info</h3>
      <form onSubmit={handleLogout}>
        <div>{user.name} is logged in</div>
        <button id='logout-button' type="submit">logout</button>
      </form>
    </div>
  )
}

export default Logout
