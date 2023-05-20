import React, {useState} from "react";
import { authenticateCustomer } from "../api/authentication";

const Login = ({setToken, setIsLoggedIn, setCustomer}) => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await authenticateCustomer(email, password);
    if(data.token){
        setToken(data.token);
        setIsLoggedIn(true);
        setCustomer(data.customer);
    } else {alert('Incorrect Username or Password, please try again')}
    setEmail("");
    setPassword("")
}

return(
    <>
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
        <input type="text" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
        <button type="submit">LogIn</button>
    </form>
    </>
)

}

export default Login
