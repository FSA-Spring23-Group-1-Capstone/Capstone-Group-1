import React, { useState } from "react";
import { getAllGames, updateGame } from "../api/games";

const UpdateGameForm = ({token, setAllGames, gameId}) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [price, setPrice] = useState("")
    const [inventory, setInventory] = useState("")
    const [system, setSystem] = useState("") 

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('this is sytem: ', system)
        const updatedGame = await updateGame(name, price, description, imageUrl, inventory, system, gameId, token);
        const allGamesNew = await getAllGames();
        console.log('updated game:', updatedGame)
            setAllGames(allGamesNew)
            setName("")
            setDescription("")
            setImageUrl("")
            setPrice("")
            setInventory("")
            setSystem("")

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(event) => {setName(event.target.value)}}></input>
                <input type="text" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)}></input>
                <input type="text" placeholder="Image URL" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}></input>
                <input type="text" placeholder="Price" value={price} onChange={(event) => setPrice(event.target.value)}></input>
                <input type="text" placeholder="inventory" value={inventory} onChange={(event) => setInventory(event.target.value)}></input>
                <select name="system" value={system} onChange={(event) => {setSystem(event.target.value)}}>
                    <option>Select System</option>
                    <option value="Xbox">Xbox</option>
                    <option value="Playstation">Playstation</option>
                    <option value="Nintendo">Nintendo</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default UpdateGameForm