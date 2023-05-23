const APIURL = "http://localhost:8080/api";

export const getAllGames = async () => {
  try {
    const response = await fetch(`${APIURL}/game`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};


export const createGame = async (name, price, description, imageUrl, inventory, system, token) => {
  console.log('here are props: ', name, price, description, imageUrl, inventory, system, token)
  try {
    const response = await fetch(`${APIURL}/game/create`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({name: name, price: price, description: description, imageUrl: imageUrl, inventory: inventory, system: system})
  })
    const result = await response.json();
    return result
  } catch (error) {
    console.error(error);
  }
}
