const express = require("express");
const {
  getAllOrdersByCustomer,
  updateOrderItemQuantity,
  createOrderItem,
  deleteOrdeItem,
} = require("../db/orders");
const ordersRouter = express.Router();

// ordersRouter.get("/", async (req, res, next) => {
//     try {
//       res.send("Hit the orders api!");
//     } catch (error) {
//       throw error;
//     }
//   });

ordersRouter.get("/", async (req, res, next) => {
  console.log("we hit the GET router");
  const { user: email } = req.body;
  try {
    const orders = await getAllOrdersByCustomer(email);
    console.log(orders);
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

// need a create route

ordersRouter.post("/addtocart", async (req, res, next) => {
  const { customerId, productId, quantity, purchasePrice } = req.body;
  console.log(customerId, productId, quantity, purchasePrice);
  try {
    const orderItem = await createOrderItem(
      customerId,
      productId,
      quantity,
      purchasePrice
    );
    console.log(orderItem);
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
