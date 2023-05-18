const router = require("express").Router();
const customerRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getCustomerByCustomerEmail } = require("../db/customers");
const requireCustomer = require("./utilities");

// GET: api/users
customerRouter.get("/", async (req, res, next) => {
  try {
    res.send("Hit the customer api!");
  } catch (error) {
    throw error;
  }
});