
const express = require("express");
const { get, post } = require(".");
const { getAllOrdersByCustomer } = require("../db/orders");
const ordersRouter = express.Router();

// ordersRouter.get("/", async (req, res, next) => {
//     try {
//       res.send("Hit the orders api!");
//     } catch (error) {
//       throw error;
//     }
//   });

ordersRouter.get('/', async (req, res, next) => {
    console.log('we hit the GET router')
    const { user: email} = req.body;
    try {
    const orders = await getAllOrdersByCustomer(email);
console.log(orders)
    res.send('hello', orders)
} catch (error) {
    next(error)
}

})

module.exports = ordersRouter





// post







