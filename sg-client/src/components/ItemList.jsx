import React from 'react'

const ItemList = ({ dataList }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4rem" }}>
      <h2 style={{ fontSize: "1.5rem" }}>브랜드캐스트 back_customer 데이터베이스 페칭 결과</h2>
      <ul>{Array.isArray(dataList) && dataList.map(el => <li style={{ fontSize: "1.2rem" }}>{el.name}</li>)}</ul>
    </div>
  )
}

export default ItemList