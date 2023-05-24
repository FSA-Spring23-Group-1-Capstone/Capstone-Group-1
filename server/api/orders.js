const express = require("express");

const {
  getAllOrdersByCustomer,
  updateOrderItemQuantity,
  createOrderItem,
  deleteOrdeItem,
  getOrderIdByCustomerId,
} = require("../db/orders");
const ordersRouter = express.Router();

ordersRouter.post("/", async (req, res, next) => {
  console.log("we hit the POST router");
  const { email } = req.body;
  try {
    const orders = await getAllOrdersByCustomer(email);

    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/:customerId", async (req, res, next) => {
  console.log("PARAMMMS", req.params);
  const { customerId } = req.params;
  try {
    const currentOrderId = await getOrderIdByCustomerId(customerId);

    res.send(currentOrderId);
  } catch (error) {
    next(error);
  }
});
// need a create route

ordersRouter.post("/addtocart", async (req, res, next) => {
  const { customerId, productId, quantity, purchasePrice } = req.body;
  try {
    const orderItem = await createOrderItem(
      customerId,
      productId,
      quantity,
      purchasePrice
    );

    res.send(orderItem);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/update", async (req, res, next) => {
  const { orderItemId, quantity } = req.body;
  try {
    const orderItem = await updateOrderItemQuantity(orderItemId, quantity);

    res.send(orderItem);
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete("/delete", async (req, res, next) => {
  const { orderItemId } = req.body;
  try {
    const deletedItem = await deleteOrdeItem(orderItemId);

    res.send(deletedItem);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;

// post
