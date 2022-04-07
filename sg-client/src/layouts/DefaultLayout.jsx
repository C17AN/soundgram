import React from 'react'
import Header from 'components/common/Header'
import Sidebar from 'components/common/Sidebar'
import Footer from 'components/common/Footer'

const DefaultLayout = ({ children }) => {
  return (
    <>
      <div className="wrap fold_lnb">
        <Header />
        <Sidebar />
      </div>
      <div className="contents_wrap">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default DefaultLayout