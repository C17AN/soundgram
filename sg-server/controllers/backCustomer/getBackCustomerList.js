import query from "../../services/db.js";
import express from 'express';
import { selectBackCustomerList } from "../../sql/backCustomer/selectBackCustomerList.js";
import getBackCustomerList from "../../services/getBackCustomerList.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await getBackCustomerList())
  } catch (err) {
    next(err)
  }
})

export default router