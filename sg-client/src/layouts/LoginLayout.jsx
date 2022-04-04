import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const LoginLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      {children}
    </div>
  )
}

export default LoginLayout