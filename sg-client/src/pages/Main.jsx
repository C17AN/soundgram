import React from 'react'
import Contents from 'components/pages/Main/Contents'
import Main from 'components/pages/Main'
import DefaultLayout from 'layouts/DefaultLayout'

const MainPage = () => {
  return (
    <DefaultLayout>
      <Main />
      <Contents />
    </DefaultLayout>
  )
}

export default MainPage