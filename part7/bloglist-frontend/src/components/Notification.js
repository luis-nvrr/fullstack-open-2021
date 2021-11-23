import React from 'react'
import './Notification.css'

const Notification = ({ message, notificationType }) => {
  if (message === null) {
    return null
  }

  return <div className={notificationType}>{message}</div>
}

export default Notification
