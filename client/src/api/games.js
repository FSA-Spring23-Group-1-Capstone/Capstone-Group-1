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
