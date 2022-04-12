import React from 'react'
import Header from 'components/common/Header'
import Sidebar from 'components/common/Sidebar'
import Footer from 'components/common/Footer'
import useIsMobile from 'hooks/useIsMobile'
import commonStyle from "styles/common.module.css"
import classNames from 'classnames'

const DefaultLayout = ({ children }) => {
  const isMobile = useIsMobile()
  return (
    <>
      <div className={classNames("wrap", { [commonStyle["fold_lnb"]]: isMobile })}>
        <div className={commonStyle.contents_wrap} id="contents_wrap">
          <Header />
          <Sidebar />
          <>{children}</>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default DefaultLayout