import React, { useState } from "react";
import { authenticateNewCustomer } from "../api/authentication";

const Register = ({ setToken, setIsLoggedIn, setCustomer }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("#####", name, email, password, address);
    const data = await authenticateNewCustomer({
      name,
      email,
      password,
      address,
    });
    if (data.token) {
      setToken(data.token);
      setIsLoggedIn(true);
      setCustomer(data.customer);
    } else {
      alert("That email is already in use");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="register-body">
      <h3>Register Now!</h3>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          className="register-input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        ></input>
        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          className="register-input"
          type="text"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <input
          className="register-input"
          type="text"
          placeholder="Address, City, State, Zip"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        ></input>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
