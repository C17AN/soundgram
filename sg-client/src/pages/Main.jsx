import React from 'react'
import Contents from '../components/Contents'
import Main from '../components/Main'
import DefaultLayout from '../layouts/DefaultLayout'

const MainPage = () => {
  return (
    <DefaultLayout>
      <Main />
      <Contents />
    </DefaultLayout>
  )
}

export default MainPage