import React from 'react'
import Contents from 'components/pages/Main/Contents'
import Main from 'components/pages/Main'
import DefaultLayout from 'layouts/DefaultLayout'
import useIsMobile from 'hooks/useIsMobile'

const MainPage = () => {
  let isMobile = useIsMobile()
  return (
    <DefaultLayout>
      <Main />
      <Contents />
    </DefaultLayout>
  )
}

export default MainPage