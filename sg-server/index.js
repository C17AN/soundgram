
import express from 'express';
const app = express()
const PORT = process.env.SERVER_PORT || 5000;
import getBackCustomerList from './controllers/backCustomer/getBackCustomerList.js';
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

app.use(cors())

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
// dkkkkkdkkkkkkkdfdf
// fdfdf
app.get("/", (req, res) => {
  res.send("Demo Home")
})

app.use('/backCustomer', getBackCustomerList)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});