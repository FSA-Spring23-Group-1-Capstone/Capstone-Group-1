const client = require("../db/client");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getCustomerByCustomerEmail } = require("../db/customers");

const router = require("express").Router();
router.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");
  console.log('this is auth: ', auth)
  if (!auth) {
    console.log('no auth')
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    const { email } = jwt.verify(token, JWT_SECRET);
    if (email) {
      req.customer = await getCustomerByCustomerEmail(email);
      // console.log('YYYYYYY', req.user)
      next();
    }
  } else {
    next({ message: "Authorization error" });
  }
});

router.get("/health", async (req, res, next) => {
  try {
    const uptime = process.uptime();

    const {
      rows: [dbConnection],
    } = await client.query(`SELECT NOW();`);

    const currentTime = new Date();

    const lastRestart = new Intl.DateTimeFormat("en", {
      timestyle: "long",
      dateStyle: "long",
      timeZone: "America/New_York",
    }).format(currentTime - uptime * 1000);

    res.send({
      message: "The api is healthy!",
      uptime,
      dbConnection,
      currentTime,
      lastRestart,
    });
  } catch (error) {
    next(error);
  }
});
const customerRouter = require("./customer");
router.use("/customer", customerRouter);

const gameRouter = require("./game");
router.use("/game", gameRouter);

const ordersRouter = require("./orders");
router.use("/orders", ordersRouter);


module.exports = router;
