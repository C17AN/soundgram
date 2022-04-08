import React from 'react'
import loginLogo from "assets/images/login_logo.png"
import signInStyle from "styles/pages/SignIn.module.css"
import defaultStyle from "styles/default.module.css"
import commonStyle from "styles/common.module.css"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import "styles/bootstrap.css"

const SignIn = () => {
  const navigate = useNavigate()

  const onSignIn = () => {
    navigate("/admin")
  }

  return (
    <div className={signInStyle.login_wrap}>
      <div className={signInStyle.left}>
        <div className={signInStyle.logo}>
          <img src={loginLogo} alt="BrandCast" />
        </div>
        <span>ver. 2021S3</span>
        <Link to="/signUp">
          <div className={signInStyle.btn_wrap}>
            <button type="button">회원가입</button>
          </div>
        </Link>
      </div>
      <div className={signInStyle.right}>
        <div className={signInStyle["form-group"]}>
          <label for="login_id" className={defaultStyle.blind}></label>
          <input
            className={signInStyle["form-control"]}
            type="text"
            id="login_id"
            name="id"
            placeholder="아이디"
          />
        </div>
        <div className={signInStyle["form-group"]}>
          <label for="login_pw" className={defaultStyle.blind}></label>
          <input
            className={signInStyle["form-control"]}
            type="password"
            id="login_pw"
            name="pwd"
            placeholder="패스워드"
          />
        </div>
        <div className={`${signInStyle["form-group"]} ${signInStyle["line_txt"]}`}>
          <span className={signInStyle.save}>
            <input type="checkbox" class="" name="ming" id="ming" />
            <label class="" for="ming">아이디 저장</label>
          </span>
          <span className={signInStyle.such}>
            <a href="#">아이디 찾기 / 임시 비밀번호</a>
          </span>
        </div>
        <div className={signInStyle["form-group"]}>
          <button class="" type="submit" onClick={onSignIn}>로그인</button>
        </div>
      </div>
    </div>
  )
}

export default SignIn