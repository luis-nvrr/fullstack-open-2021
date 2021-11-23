import { React } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleLogin, handleUsernameChange, handlePasswordChange }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input id='username' type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        password
        <input id='password' type="password" value={password} name="Password" onChange={handlePasswordChange} />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange : PropTypes.func.isRequired,
  handleLogin : PropTypes.func.isRequired
}

export default LoginForm
