import React from 'react'
import "./index.css"

const Contents = () => {
  return (
    <div class="contents con02">
      <div class="con_in clear">
        <div class="section left">
          <div class="section_in">
            <div>
              <div class="tit">
                <h3>주간 네이버 브랜드 검색 평판 현황</h3>
                <span><a href="#" class="btn_more">more</a></span>
              </div>
              <div class="con_box">그래프 넣을 공간</div>
            </div>
          </div>
        </div>
        <div class="section right">
          <div class="section_in">
            <div>
              <div class="tit">
                <h3>최근 올라온 부정글</h3>
                <span><a href="#" class="btn_more">more</a></span>
              </div>
              <div class="con_box">
                <table>
                  <tbody>
                    <tr>
                      <td class="iconarea">
                        <span>뉴스</span>
                      </td>
                      <td class="txtarea">
                        <p class="tit_text">
                          제목이 있는 글은 제목만 긁어오는 거 같네요
                          ’”맞죠?”
                        </p>
                        <ul>
                          <li>언론사명</li>
                          <li>2021.06.15 11:25:33</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td class="iconarea">
                        <span>블로그</span>
                      </td>
                      <td class="txtarea">
                        <p class="tit_text">
                          블로그 제목 일이삼사오육칠팔구십
                          일이삼사오육칠팔구십
                        </p>
                        <ul>
                          <li>네이버</li>
                          <li>아이디아이디</li>
                          <li>2021.06.15 11:25:33</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td class="iconarea">
                        <span>지식인</span>
                      </td>
                      <td class="txtarea">
                        <p class="none_tit">
                          지식인은 답변이 내용만 보이나? 복사해온 글이
                          내용만 있네요. 내용만 있을경우는 얇은
                          서체로2줄정도 보이는게 좋겠어요. 내용이
                          잘릴때까지 어쩌구저쩌구.
                        </p>
                        <ul>
                          <li>네이버</li>
                          <li>아이디아이디</li>
                          <li>2021.06.15 11:25:33</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td class="iconarea">
                        <span>지식인</span>
                      </td>
                      <td class="txtarea">
                        <p class="tit_text">
                          변비있고 잘개워내는 아기 분유추천해주세요:)
                        </p>
                        <ul>
                          <li>네이버</li>
                          <li>아이디아이디</li>
                          <li>2021.06.15 11:25:33</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td class="iconarea">
                        <span>카페</span>
                      </td>
                      <td class="txtarea">
                        <p class="tit_text">
                          카페글 제목이 보여집니다. 일이삼 사오육칠팔구십
                        </p>
                        <ul>
                          <li>네이버</li>
                          <li>아이디아이디</li>
                          <li>2021.06.15 11:25:33</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contents