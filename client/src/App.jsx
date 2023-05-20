import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import NavBar from './components/NavBar'

function App() {
  const [token, setToken] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [customer, setCustomer] = useState([])

  return (
    <div className="App">
      <NavBar token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} setCustomer={setCustomer}/>
    </div>
  )
}

export default App
