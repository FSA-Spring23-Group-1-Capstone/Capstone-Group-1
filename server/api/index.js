const client = require('../db/client');

const router = require('express').Router();

router.get('/health', async (req, res, next) => {
  try {
    const uptime = process.uptime();

    const {
      rows: [dbConnection],
    } = await client.query(`SELECT NOW();`);

    const currentTime = new Date();

    const lastRestart = new Intl.DateTimeFormat('en', {
      timestyle: 'long',
      dateStyle: 'long',
      timeZone: 'America/New_York',
    }).format(currentTime - uptime * 1000);

    res.send({
      message: 'The api is healthy!',
      uptime,
      dbConnection,
      currentTime,
      lastRestart,
    });
  } catch (error) {
    next(error);
  }
});
const customerRouter = require("./customer")
router.use("/customer", customerRouter);

const ordersRouter = require("./orders")
router.use("/orders", ordersRouter);

const orderItemsRouter = require("./orderItems")
router.use("/orderItems", orderItemsRouter);

module.exports = router;
