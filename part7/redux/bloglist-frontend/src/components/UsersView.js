import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialize } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const UsersView = () => {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(initialize())
  }, [])

  const style = {
    textAlign: 'center'
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td style={style}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView
