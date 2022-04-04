import React from 'react'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'

const DefaultLayout = ({ children }) => {
  return (
    <div class="wrap">
      <div id="contents_wrap" class="contents_wrap">
        <Header />
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default DefaultLayout