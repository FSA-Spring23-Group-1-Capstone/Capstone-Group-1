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
        name: "Spider-Man: Miles Morales",
        price: 70.0,
        description:
          "Experience the mean streets of Manhattan as a fresh Spider-Man in Marvel's Spider-Man: Miles Morales. Witness the emergence of a new hero in this thrilling Spider-verse tale. Teenager Miles Morales navigates his new home, following in the footsteps of mentor Peter Parker. However, a power struggle threatens to obliterate his beloved city, compelling Miles to embrace his powers and embrace the responsibility that comes with them. To rescue Marvel's New York, he must become Spider-Man and rise to the occasion.",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Spider-Man_Miles_Morales.jpeg/220px-Spider-Man_Miles_Morales.jpeg",
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
        name: "The Witcher III: Wild Hunt",
        price: 35.0,
        description:
          "Embark on a monster-slaying journey as a professional in The Witcher III: Wild Hunt. Immerse yourself in a dark fantasy world, an open RPG with a gripping character-driven narrative, impactful choices, and tactical combat. The third installment elevates every aspect of the series, featuring refined combat mechanics, new Witcher senses, thrilling monster hunts, enhanced alchemy, powerful magic signs, and an intricate crafting system. Face the ancient force of spectral riders that have long plagued the world, as destiny aligns with Geralt, the chosen one. Prepare to wield all your abilities against this formidable foe in a quest that feels personal.",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Witcher_3_cover_art.jpg/220px-Witcher_3_cover_art.jpg",
        inventory: 45,
        system: "Xbox, Playstation, Nintendo",
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
        name: "Super Mario Odyssey",
        price: 55.0,
        description:
          "Embark on an exhilarating global escapade! Accompany Mario on a grand 3D adventure across diverse landscapes, as he harnesses extraordinary new abilities to gather Moons, empower the majestic Odyssey airship, and thwart Bowser's wedding machinations to rescue Princess Peach. Discover a sandbox-style world brimming with hidden secrets and delightful surprises. With Mario's novel maneuvers like cap throw, cap jump, and capture, prepare for an unprecedented Mario gaming experience. Brace yourself to be transported to wondrous and enigmatic realms that lie far beyond the familiar Mushroom Kingdom!",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Super_Mario_Odyssey.jpg/220px-Super_Mario_Odyssey.jpg",
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
        name: "Star Wars: Jedi Survivor",
        price: 65.0,
        description:
          "Join Cal Kestis in Star Wars Jedi: Survivor™, a thrilling third-person action-adventure from Respawn Entertainment and Lucasfilm Games. Set five years after Star Wars Jedi: Fallen Order™, witness Cal's desperate struggle against a darkening galaxy. Expand your Jedi skills with iconic Force abilities, combat stances, and lightsaber customizations. To overcome challenges, master new abilities, tactics, and leverage the environment. Explore new planets, reunite the Stinger Mantis crew, and uncover secrets across the Galaxy's treacherous terrain. Prepare for an epic journey of danger and discovery.",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/en/thumb/4/43/Star_Wars_Jedi_Survivor.jpg/220px-Star_Wars_Jedi_Survivor.jpg",
        inventory: 35,
        system: "Xbox, Playstation",
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
        name: "The Legend of Zelda: Tears of the Kingdom ",
        price: 70.0,
        description:
         " As darkness looms, the Demon King awakens, Zelda vanishes, and Hyrule teeters on the edge. Link must save the kingdom, unveil the mystery. Delve into the subterranean depths, soar atop floating islands. Utilize Link's new abilities to create, upgrade vehicles and weapons. Will you conquer the challenge, rescue Hyrule, uncover the Princess's fate? The kingdom's destiny hangs in balance.",
        imageUrl:"https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg/220px-The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg",
        inventory: 20,
        system: "Nintendo",
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
