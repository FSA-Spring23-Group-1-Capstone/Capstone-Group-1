const APIURL = "http://localhost:8080/api";

export const getAllGames = async () => {
  try {
    const response = await fetch(`${APIURL}/game`);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const createGame = async (
  name,
  price,
  description,
  imageUrl,
  inventory,
  system,
  token
) => {
  console.log(
    "here are props: ",
    name,
    price,
    description,
    imageUrl,
    inventory,
    system,
    token
  );
  try {
    const response = await fetch(`${APIURL}/game/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        price: price,
        description: description,
        imageUrl: imageUrl,
        inventory: inventory,
        system: system,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const updateGame = async (name, price, description, imageUrl, inventory, system, gameId, token) => {
  try {
    const response = await fetch(`${APIURL}/game/${gameId}/update`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({name, price, description, imageUrl, inventory, system})
  })
    const result = await response.json();
    return result
  } catch (error) {
    console.error(error);
  }
}

export const deleteGame = async (gameId, token) => {
  try {
    const response = await fetch(`${APIURL}/game/${gameId}/delete`, {
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }

    })
    
    const result = await response.json();
 
    return  result
  } catch (error) {
    console.error(error);
}
}
 export const getGameByGameId = async (gameId, token) => {
  try {
    const response = await fetch (`${APIURL}/game/${gameId}/getgame`, {
      method: "GET",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    const result = await response.json();

    return result
  } catch (error) {
    console.error(error);
  }
 }
