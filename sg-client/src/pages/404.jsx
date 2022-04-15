import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div>
      <div>페이지를 찾을 수 없습니다.</div>
      <Link to="/signIn"><div>로그인 메뉴로 이동하기</div></Link>
    </div>
  )
}

export default NotFoundPage