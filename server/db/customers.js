const client = require('./client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const saltRounds = 10;
const SALT_COUNT = 10;


async function createCustomer({
  name,
  email,
  password,
  address
}) {
   const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
   try {
    const {rows: [ customer ] } = await client.query(`
    INSERT INTO customers( name, email, password, address)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (email) DO NOTHING
    RETURNING *;
    `,[name, email, password, address])
    delete customer.password
    return customer;
   } catch (error) {
     console.log(error)
     throw (error)
   }
}

async function getCustomer({email, password}) {
try {
  const {rows: [ customer ] } = await client.query(`
  SELECT * FROM customers
  WHERE email = $1
  RETURNING *;
  `, [ email ])
  delete customer.password
  return customer;
 } catch (error) {
  throw (error)
  console.log(error) 
}
}

async function getCustomerByCustomerEmail(email) {
  try {
  const {rows: [ customer ] } = await client.query(`
  SELECT * FROM customers
  WHERE email = $1
  RETURNING *;
  `, [ email ])
  delete customer.password
  return customer;
 } catch (error) {
  throw (error)
  console.log(error) 
}
}

module.exports = {
  createCustomer,
  getCustomer,
  // getCustomerById,
  getCustomerByCustomerEmail
};
