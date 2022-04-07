import React from 'react'
import loginLogo from "assets/images/login_logo.png"
import { Link, Navigate, useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate()

  const onSignIn = () => {
    navigate("/admin")
  }

  return (
    <div className="login_wrap">
      <div class="left">
        <div class="logo">
          <img src={loginLogo} alt="BrandCast" />
        </div>
        <span>ver. 2021S3</span>
        <Link to="/signUp">
          <div class="btn_wrap">
            <button type="button">회원가입</button>
          </div>
        </Link>
      </div>
      <div class="right">
        <div class="form-group">
          <label for="login_id" class="blind"></label>
          <input
            class="form-control"
            type="text"
            id="login_id"
            name="id"
            placeholder="아이디"
          />
        </div>
        <div class="form-group">
          <label for="login_pw" class="blind"></label>
          <input
            class="form-control"
            type="password"
            id="login_pw"
            name="pwd"
            placeholder="패스워드"
          />
        </div>
        <div class="form-group line_txt">
          <span class="save">
            <input type="checkbox" class="" name="ming" id="ming" />
            <label class="" for="ming">아이디 저장</label>
          </span>
          <span class="such"
          ><a href="#">아이디 찾기 / 임시 비밀번호</a></span
          >
        </div>
        <div class="form-group">
          <button class="" type="submit" onClick={onSignIn}>로그인</button>
        </div>
      </div>
    </div>
  )
}

export default SignIn