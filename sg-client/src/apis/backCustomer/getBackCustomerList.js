import axios from "axios";

const getBackCustomerList = async () => {
  try {
    const { data: { data } } = await axios.get("http://localhost:5000/backCustomer")
    return data
  }
  catch (err) {
    console.log(err)
    return { data: err }
  }
}

export default getBackCustomerList