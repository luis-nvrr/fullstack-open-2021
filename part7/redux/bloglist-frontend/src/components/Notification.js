import React from 'react'
import './Notification.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return <div></div>
  }

  return <div className={notification.type}>{notification.message}</div>
}

export default Notification
