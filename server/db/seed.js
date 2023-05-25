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
      {
        name: "Alan Wake",
        price: 25.0,
        description:
          "When the wife of the best-selling writer Alan Wake disappears on their vacation, his search turns up pages from a thriller he doesn’t even remember writing. A Dark Presence stalks the small town of Bright Falls, pushing Wake to the brink of sanity in his fight to unravel the mystery and save his love.",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Alan_Wake_Game_Cover.jpg/220px-Alan_Wake_Game_Cover.jpg",
        inventory: 25,
        system: "Xbox",
      },
      {
        name: "Red Dead Redemption",
        price: 35.0,
        description:
          "America, 1911. The Wild West is dying. When federal agents threaten his family, former outlaw John Marston is forced to pick up his guns again and hunt down the gang of criminals he once called friends. Experience an epic fight for survival across the sprawling expanses of the American West and Mexico, as John Marston struggles to bury his blood-stained past, one man at a time.",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Red_Dead_Redemption.jpg/220px-Red_Dead_Redemption.jpg",
        inventory: 35,
        system: "Xbox, Playstation",
      },
      {
        name: "Super Mario Sunshine",
        price: 20.0,
        description:
          "When Mario, Peach, and an entourage of Peach's loyal Toad friends set out for a tropical vacation on lovely Isle Delfino, they're in store for much more than a relaxing holiday. A mustachioed maniac has mucked up the entire island, and Mario is accused of committing the crime. Armed with a hi-tech water cannon called FLUDD (Flash Liquidizer Ultra Dousing Device), Mario sets out to clean the island, clear his name, and solve the mystery of the villainous vandal.",
        imageUrl: "https://i.ebayimg.com/images/g/--kAAOSw625hIW4Q/s-l1600.jpg",
        inventory: 20,
        system: "Nintendo",
      },
      {
        name: "Mario Kart 8",
        price: 40.0,
        description:
          "Hit the road with the definitive version of Mario Kart 8 and play anytime, any-where! Race your friends or battle them in a revised battle mode on new and returning battle courses. Play locally in up to 4-player multiplayer in 1080p while playing in TV Mode. Every track from the Wii U version, including DLC, makes a glorious return. Plus, the Inklings appear as all-new guest characters, along with returning favorites, such as King Boo, Dry Bones, and Bowser Jr.!",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/MarioKart8Boxart.jpg/220px-MarioKart8Boxart.jpg",
        inventory: 40,
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
