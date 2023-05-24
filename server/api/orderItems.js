const express = require("express");
const orderItemsRouter = express.Router();
const { getAllOrderItemsByOrderId } = require("../db/orders");

const { requireCustomer } = require("./utilities");

orderItemsRouter.get("/:orderid", requireCustomer, async (req, res, next) => {
  const { orderid } = req.params;

  try {
    const result = await getAllOrderItemsByOrderId(orderid);
    res.send(result);
  } catch (error) {
    throw error;
  }
});
module.exports = orderItemsRouter;
