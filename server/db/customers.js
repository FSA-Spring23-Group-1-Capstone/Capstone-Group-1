const client = require("./client");
const bcrypt = require("bcrypt");
// const saltRounds = 10;
const SALT_COUNT = 10;

async function createCustomer({ name, email, password, address, admin }) {
  console.log('PPPPPP', name, email, password, address, admin)
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
    INSERT INTO customers( name, email, password, address, admin)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (email) DO NOTHING
    RETURNING *;
    `,
      [name, email, hashedPassword, address, admin]
    );
    delete customer.password;
    console.log('PPPPPP', customer)
    return customer;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getCustomer({ email, password }) {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
  SELECT * FROM customers
  WHERE email = $1;

  `,
      [email]
    );
    delete customer.password;
    return customer;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCustomerByCustomerEmail(email) {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
  SELECT * FROM customers
  WHERE email = $1;
 
  `,
      [email]
    );

    return customer;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createCustomer,
  getCustomer,
  // getCustomerById,
  getCustomerByCustomerEmail,
};
