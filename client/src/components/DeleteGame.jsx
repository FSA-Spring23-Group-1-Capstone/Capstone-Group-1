import React, { useEffect } from "react";
import { deleteGame, getAllGames } from "../api/games";

const DeleteGame = ({gameId, token, setAllGames, allGames}) => {

const handleDelete = async () =>  {
    const deletedGame = await deleteGame(gameId, token);
    const data = await getAllGames();
    setAllGames(data);
    return deletedGame 
    }
return (
    <button onClick={handleDelete} >Delete</button>
)
}

export default DeleteGame