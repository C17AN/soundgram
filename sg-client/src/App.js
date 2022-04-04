import getBackCustomerList from "./apis/backCustomer/getBackCustomerList";
import ItemList from "./components/ItemList";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Contents from "./components/Contents";

function App() {
  const [backCustomerList, setBackCustomerList] = useState([])

  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    const data = await getBackCustomerList()
    setBackCustomerList(data)
  }

  return (
    <div className="App">
      <Header />
      <Main />
      <Contents />
      <ItemList dataList={backCustomerList} />
    </div>
  );
}

export default App;
