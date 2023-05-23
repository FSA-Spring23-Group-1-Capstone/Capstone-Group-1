const express = require("express");
const customerRouter = express.Router();
const jwt = require("jsonwebtoken");

const {
  getCustomerByCustomerEmail,
  createCustomer,
} = require("../db/customers");

const { requireCustomer } = require("./utilities");
const bcrypt = require("bcrypt");
const { createOrder } = require("../db/orders");

// GET: api/users
customerRouter.get("/", async (req, res, next) => {
  try {
    res.send("Hit the customer api!");
  } catch (error) {
    throw error;
  }
});

customerRouter.post("/register", async (req, res, next) => {
  const { name, email, password, address, admin } = req.body;
  try {
    const _user = await getCustomerByCustomerEmail(email);
    if (_user) {
      next({
        error: "Error",
        name: "EmailExistsError",
        message: `Email ${email} is already taken.`,
      });
    }

    if (password.length < 5) {
      next({
        error: "Error",
        name: "Password Too Short!",
        message: "Password Too Short!",
      });
    }

    const customer = await createCustomer({
      name,
      email,
      password,
      address,
      admin,
    });

    console.log("@@@@", customer);
    const { id } = customer;
    const newCart = createOrder(id);

    const token = jwt.sign(
      {
        name: customer.name,
        email: customer.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1yr",
      }
    );

    res.send({
      message: "Thank you for registering!",
      token: token,
      customer: customer,
    });
  } catch (error) {
    next(error);
  }
});

customerRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log("$$$$$$", email, password);
  if (!email || !password) {
    next({
      error: "Error",
      name: "MissingCredentialsError",
      message: "Please supply both a email and password",
    });
  }
  try {
    const customer = await getCustomerByCustomerEmail(email);
    console.log(customer);
    if (customer) {
      const match = await bcrypt.compare(password, customer.password);
      if (match) {
        const token = jwt.sign(customer, process.env.JWT_SECRET);
        res.send({ token, customer, message: "You're logged in!" });
      } else {
        next({ message: "Invalid Password!" });
      }
    } else {
      next({ message: `Invalid Email! --> ${email}` });
    }
  } catch (error) {
    next(error);
  }
});

// This route will access customer info in order to render orders on the my account page
customerRouter.get("/me", requireCustomer, async (req, res, next) => {
  try {
    const { email } = req.customer;
    const customer = await getCustomerByCustomerEmail(email);
    res.send(customer);
  } catch (error) {
    throw error;
  }
});
module.exports = customerRouter;
