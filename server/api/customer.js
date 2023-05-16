const router = require('express').Router();
const customerRouter = express.router();
const jwt = require('jsonwebtoken');
const { getCustomerByCustomerEmail } = require('../db/customers');
const requireCustomer = require('./utilities');

// GET: api/users
customerRouter.get('/', async (req, res, next) => {
  try {
    res.send('Hit the customer api!');
  } catch (error) {
    throw error;
  }
});

customerRouter.post("/register", async (req, res, next) => {
  const {email, password} = req.body;
  try {
      const _user = await getCustomerByCustomerEmail(email);
      if (_user) {
          next({
              error:"Error",
              name: "EmailExistsError",
              message: `Email ${email} is already taken.`
          });
      }

      if (password.length < 5) {
          next({
              error: "Error",
              name: "Password Too Short!",
              message: "Password Too Short!"
          });
      }    

      const customer = await createCustomer({name, email, password, address});
      
      const token = jwt.sign({
          name: customer.name,
          password: customer.password,
          email: customer.email
      }, process.env.JWT_SECRET, {
          expiresIn: "1yr"
      })

      res.send({
          message: "thank you for registering",
          token: token,
         customer : customer
      });
  } catch (error) {
      next(error);
  }
});

customerRouter.post("/login", async (req, res, next) => {
  const {email, password} = req.body;
  if (!email || !password) {
      next({
          error: "Error",  
          name: "MissingCredentialsError",
          message: "Please supply both a email and password"
      });
  } 
  try {
      const customer = await getCustomerByCustomerEmail(email);
      
      const token = jwt.sign(customer, process.env.JWT_SECRET);

      res.send({
              
              message: "you're logged in!",
              customer,
              token
          });
  } catch (error) {
      next(error);
  }
});

customerRouter.get("/me", requireCustomer, async (req, res, next) => {
  const {email} = req.body;
  try {
    if(req.customer){
        const {email} = req.customer;
        const customer = await getCustomerByCustomerEmail(email)
        res.send(customer)
    }else res.status(401)
} catch (error) {
    next(error)
}
} )
module.exports = customerRouter;
