const client = require("./client");
const { createCustomer } = require("./customers");
const {
  getAllGames,
  createGame,
  getGameByName,
  updateGame,
  deleteGame,
  getGameById,
} = require("./game");

const dropTables = async () => {
  try {
    console.log("Starting to drop all tables...");
    await client.query(`
    DROP TABLE IF EXISTS order_items;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS customers;
    DROP TABLE IF EXISTS products;
    `);
    console.log("Finished droppping all tables successfully!");
  } catch (error) {
    console.error("Error dropping tables");
    throw error;
  }
};

async function createTables() {
  console.log("Starting to build tables...");
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
      "orderCompleted" BOOLEAN DEFAULT false,
      "customerId" INTEGER REFERENCES customers(id)
    );
    CREATE TABLE products (
      id SERIAL primary key,
      name VARCHAR(255) NOT NULL,
      price MONEY NOT NULL,
      description TEXT,
      "imageUrl" TEXT NOT NULL,
      inventory INTEGER NOT NULL,
      system TEXT NOT NULL
    );


    CREATE TABLE order_items(
      "orderItemId" SERIAL PRIMARY KEY,
      "orderId" INTEGER REFERENCES orders(id),
      "productId" INTEGER REFERENCES products(id),
      quantity INTEGER,
      "purchasePrice" INTEGER NOT NULL

    ); 

    `);
    console.log(
      "Finished creating all tables successfully! Now, to add some data!"
    );
  } catch (error) {
    console.error("Error creating tables");
    throw error;
  }
}

async function createInitialCustomers() {
  console.log("Starting to create customers...");
  try {
    const customersToCreate = [
      {
        name: "Zach",
        email: "znitz23@gmail.com",
        password: "Gamego",
        address: "123 boulevard",
        admin: true,
      },
      {
        name: "Peter",
        email: "pwlaughlin@gmail.com",
        password: "Gamego",
        address: "23 e st",
        admin: true,
      },
      {
        name: "Evan",
        email: "ewalker3764@gmail.com",
        password: "Gamego",
        address: "5 s. something st.",
        admin: true,
      },
      {
        name: "Christian",
        email: "chris.mcneil7532@gmail.com",
        password: "Gamego",
        address: "3rd one on the right",
        admin: true,
      },
    ];
    const customers = await Promise.all(customersToCreate.map(createCustomer));

    console.log("customers created:");
    // console.log(customers);
    console.log("Finished creating customers!");
  } catch (error) {
    console.error("Error creating customers!");
    throw error;
  }
}
async function createInitialGames() {
  console.log("Starting to create games...");
  try {
    const gamesToCreate = [
      {
        name: "Splinter Cell: Stealth Action Redefined",
        price: 20.0,
        description:
          "Infiltrate terrorists' positions, acquire critical intelligence by any means necessary, execute with extreme prejudice, and exit without a trace! You are Sam Fisher, a highly trained secret operative of the NSA's secret arm: Third Echelon.",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/d/dd/Tharealsplintercell.jpg",
        inventory: 20,
        system: "Xbox",
      },
      {
        name: "Batman: Arkham Asylum",
        price: 30.0,
        description:
          "Experience what it’s like to be Batman and face off against Gotham's greatest villians. Explore every inch of Arkham Asylum and roam freely on the infamous island.",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/4/42/Batman_Arkham_Asylum_Videogame_Cover.jpg",
        inventory: 30,
        system: "Playstation",
      },
      {
        name: "Assassin's Creed: Unity",
        price: 45.0,
        description:
          "Assassin’s Creed® Unity tells the story of Arno, a young man who embarks upon an extraordinary journey to expose the true powers behind the French Revolution. In the brand new co-op mode, you and your friends will also be thrown in the middle of a ruthless struggle for the fate of a nation.",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Assassin%27s_Creed_Unity_cover.jpg/220px-Assassin%27s_Creed_Unity_cover.jpg",
        inventory: 45,
        system: "Xbox, Playstation",
      },
      {
        name: "Luigi's Mansion",
        price: 15.0,
        description:
          "Luigi receives a letter informing him he has won a mansion as the grand prize in a contest. Luigi is puzzled; he never entered a contest. When he arrives at his mansion, he discovers that it is haunted with ghosts and Mario trapped inside.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/5e/Lmbox.jpg",
        inventory: 15,
        system: "Nintendo",
      },
    ];
    const games = await Promise.all(gamesToCreate.map(createGame));
    console.log("games created:");
    console.log(games);
    console.log("Finished creating games!");
  } catch (error) {
    console.error("Error creating games!");
    throw error;
  }
}

const rebuildDB = async () => {
  try {
    await dropTables();
    await createTables();
    await createInitialCustomers();
    await createInitialGames();
  } catch (error) {
    console.error("Error during rebuildDB", error);
    throw error;
  } finally {
    await client.end();
    console.log("Database has been rebuilt, and you're good to go!");
  }
};

rebuildDB();
