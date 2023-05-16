const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getCustomerByCustomerEmail } = require('../db/customers');
const {JWT_SECRET}= process.env;

const requireCustomer = async (req, res, next) => {

    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)){
        const token = auth.slice(prefix.length);
        
        const {email} = jwt.verify(token, JWT_SECRET);
        if (email) {
            req.customer = await getCustomerByCustomerEmail(email)
            // console.log('YYYYYYY', req.user)
                next();
            }
    }
  
    if(!req.email) {
        next({
          name: 'Not loggin in',
          message: "You must be logged in to perform this action",
          error: 'Error'
        });
    }
    next();
  }

  module.exports = requireCustomer;