const client = require('./client');
const { createCustomer } = require('./customers');

const dropTables = async () => {
  try {
    console.log('Starting to drop all tables...');
    await client.query(`
    DROP TABLE IF EXISTS genres;
    DROP TABLE IF EXISTS gameGenres;
    DROP TABLE IF EXISTS systems;
    DROP TABLE IF EXISTS orderItems;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS customers;
    `);
    console.log('Finished droppping all tables successfully!');
  } catch (error) {
    console.error('Error dropping tables');
    throw error;
  }
};

async function createTables() {
  console.log("Starting to build tables...")
  // create all tables, in the correct order
  try {
    await client.query(`
    CREATE TABLE customers (
      id SERIAL primary key,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(75) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      address TEXT NOT NULL,
      admin BOOLEAN DEFAULT false
    );

    CREATE TABLE orders (
      id SERIAL primary key,
      orderCompleted BOOLEAN DEFAULT false,
      "customerId" REFERENCES customers(id)
    );

    CREATE TABLE products (
      id SERIAL primary key,
      name VARCHAR(255) NOT NULL,
      price MONEY NOT NULL,
      description TEXT,
      imageUrl TEXT NOT NULL
      inventory NUM NOT NULL
    );

    CREATE TABLE system(
      id SERIAL primary key,
      name VARCHAR(20) UNIQUE NOT NULL
    );

    CREATE TABLE genre(
      id SERIAL primary key,
      name VARCHAR(20) UNIQUE NOT NULL
    );

    CREATE TABLE gameGeneres(
      "productId" REFERNECES products(id),
      "genreId" REFERNECES genre(id)
    )

    CREATE TABLE orderItems(
      orderItemId SERIAL PRIMARY KEY,
      "productId" REFERENCES products(id),
      quantity NUM,
      purchasePrice NUM NOT NULL
    )
    `);
    console.log(
      'Finished creating all tables successfully! Now, to add some data!'
    );
  } catch (error) {
    console.error('Error creating tables');
    throw error;
  }
};

async function createInitialCustomers() {
  console.log("Starting to create customers...")
  try {
    const customersToCreate = [
      { name: "Zach", email: "znitz23@gmail.com", password: "Gamego", address: "123 boulevard",  admin: true},
      { name: "Peter", email: "pwlaughlin@gmail.com", password: "Gamego", address: "23 e st",  admin: true},
      { name: "Evan", email: "ewalker3764@gmail.com", password: "Gamego", address: "5 s. something st.",  admin: true},
      { name: "Christain", email: "Chris.McNeil7532@gmail.com", password: "Gamego", address: "3rd one on the right",  admin: true}
    ]
    const customers = await Promise.all(customersToCreate.map(createCustomer))

    console.log("customers created:")
    console.log(customers)
    console.log("Finished creating customers!")
  } catch (error) {
    console.error("Error creating customers!")
    throw error
  }
}

const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialCustomers();
  } catch (error) {
    console.error('Error during rebuildDB', error);
    throw error;
  } finally {
    await client.end();
    console.log("Database has been rebuilt, and you're good to go!");
  }
};

rebuildDB();
