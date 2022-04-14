import React from 'react'
import commonStyle from "styles/common.module.scss"

const LoginHeader = () => {
  return (
    <ul>
      <li className={commonStyle.login_top}>
        <button type="button" className={commonStyle.login} onClick="location.href='login.php'; ">LOGIN</button>
      </li>
    </ul>
  )
}

export default LoginHeader