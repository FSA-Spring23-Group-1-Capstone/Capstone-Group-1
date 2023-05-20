import React from "react";
import Login from "./Login";
import Register from "./Register";

const NavBar = ({setToken, setIsLoggedIn, setCustomer}) => {
    return(
        <>
        <h1>Gamego</h1>
        <Login setToken={setToken} setIsLoggedIn={setIsLoggedIn} setCustomer={setCustomer}/>
        <Register setToken={setToken} setIsLoggedIn={setIsLoggedIn} setCustomer={setCustomer}/>
        </>
    )
}

export default NavBar