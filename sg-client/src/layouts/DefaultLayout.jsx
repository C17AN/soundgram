import React from 'react'
import Header from 'components/common/Header'
import Sidebar from 'components/common/Sidebar'
import Footer from 'components/common/Footer'
import useIsMobile from 'hooks/useIsMobile'
import commonStyle from "styles/common.module.scss"
import classNames from 'classnames'
import { useState } from 'react'

const DefaultLayout = ({ children }) => {
  const isMobile = useIsMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile)
  const toggleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <div className={classNames(commonStyle.wrap, { [commonStyle["fold_lnb"]]: !isSidebarOpen })}>
        <div className={commonStyle.contents_wrap} id="contents_wrap">
          <Header />
          <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebarOpen={toggleSidebarOpen} />
          <>{children}</>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default DefaultLayout