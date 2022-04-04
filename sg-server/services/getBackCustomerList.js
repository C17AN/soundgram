import query from "./db.js";
import { selectBackCustomerList } from "../sql/backCustomer/selectBackCustomerList.js";

const getBackCustomerList = async () => {
  try {
    const data = await query(selectBackCustomerList)
    return { data }
  } catch (err) {
    return { data: err }
  }
}

export default getBackCustomerList