import React from 'react'
import Header from 'components/common/Header'
import Sidebar from 'components/common/Sidebar'

const DefaultLayout = ({ children }) => {
  return (
    <div class="wrap">
      <Header />
      <Sidebar />
      {children}
    </div>
  )
}

export default DefaultLayout