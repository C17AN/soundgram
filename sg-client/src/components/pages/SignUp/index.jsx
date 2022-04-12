import React from 'react'
import SignUpHeaderLogo from "assets/images/logo_blue.png"
import signUpStyle from "styles/pages/SignUp.module.css"
import signInStyle from "styles/pages/SignIn.module.css"

const SignUp = () => {
  return (
    <div class={signUpStyle.sigup_wrap_div}>
      <div class={signUpStyle.sigup_wrap}>
        <div class={signUpStyle.tit}>
          <h2> 회원가입 </h2>
          <img src={SignUpHeaderLogo} alt="BrandCast" />
        </div>
        <form class={signUpStyle["form-signin"]} id='signup_form' name='signup_form' method="POST" action='login_signup_db.php' signUpStyle={{ marginTop: "15px" }} onsubmit=" return formsubmit(this);">
          <div class={signInStyle["form-group"]}>
            <label for="email" class={"blind"}> 아이디, 이메일 주소 </label>
            <input class={signUpStyle["form-control"]} type="text" name="email" id="email" placeholder="ID(이메일 주소)" required />
          </div>
          <div class={signInStyle["form-group"]}>
            <label for="password" class={"blind"}> 비밀번호 </label>
            <input class={signUpStyle["form-control"]} type="password" name="password" id="password" placeholder="비밀번호" required />
          </div>
          <div class={signInStyle["form-group"]}>
            <label for="password_check" class={"blind"}> 비밀번호 확인 </label>
            <input class={signUpStyle["form-control"]} type="password" name="password_check" id="password_check" placeholder="비밀번호 확인" required />
          </div>
          <div class={signInStyle["form-group"]}>
            <label for="manager" class={"blind"}> 담당자 이름 </label>
            <input class={signUpStyle["form-control"]} type="text" name="manager" id="manager" placeholder="이름(담당자)" required />
          </div>
          <div class={signInStyle["form-group"]}>
            <label for="manager_phone" class={"blind"}> 담당자 휴대폰 번호 </label>
            <input class={signUpStyle["form-control"]} type="text" name="manager_phone" id="manager_phone" placeholder="휴대폰번호(담당자)" required />
          </div>
          <div class={signInStyle["form-group"]}>
            <label for="company" class={"blind"}> 고객명 </label>
            <input class={signUpStyle["form-control"]} type="text" name="company" id="company" placeholder="고객명" required />
          </div>
          <div class={signInStyle["form-group"]}>
            <label for="company_tel" class={"blind"}> 고객전화번호 </label>
            <input class={signUpStyle["form-control"]} type="text" name="company_tel" id="company_tel" placeholder="고객전화번호(대표번호)" required />
          </div>
          <div class={signInStyle["form-group"]}>
            <div>
              <input type="checkbox" id="agree_terms" required oninvad="this.setCustomValidity('약관에 동의해주세요')" onInput="setCustomValidity(' ')" />
              <label for="agree_terms" class="agree_terms">
                {/* <!-- <a href="#" target="_blank">&nbsp;이용약관</a> 및
                <a href="#" target="_blank"> 개인정보처리방침</a>에 --> */}
                이용약관 및 개인정보처리방침에 동의합니다. (필수)</label>
            </div>
          </div>
          <div class={signInStyle["form-group"]}>
            <button class={signUpStyle.btn_big} type="submit">가입하기</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp