import React, { useState } from 'react'
import Card from '../Card';
import "./index.css"

const Contents = () => {
  // 1. ajax 요청으로 데이터 가져오기
  // 임시 데이터
  let [data_1, setData_1] = useState(['graph', 'left', '주간 네이버 브랜드 검색 평판 현황'])
  let [data_2, setData_2] = useState(['table', 'right', '최근 올라온 부정글'])

  return (
  <div className="contents con02">
    <div className="con_in clear">
      <Card type={data_1}/>
      <Card type={data_2}/>
    </div>
  </div>
  )
}

export default Contents