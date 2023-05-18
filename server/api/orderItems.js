const express = require("express");
const orderItemsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getCustomerByCustomerEmail } = require("../db/customers");
const requireCustomer = require("./utilities");

// GET: api/users
orderItemsRouter.get("/", async (req, res, next) => {
  try {
    res.send("Hit the customer api!");
  } catch (error) {
    throw error;
  }
});
module.exports = orderItemsRouter;
