import React from 'react'
import Header from 'components/common/Header'
import Sidebar from 'components/common/Sidebar'
import Footer from 'components/common/Footer'

const DefaultLayout = ({ children }) => {
  return (
    <div class="wrap">
      <Header />
      <Sidebar />
      {children}
      <Footer />
    </div>
  )
}

export default DefaultLayout