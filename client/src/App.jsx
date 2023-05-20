import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import NavBar from './components/NavBar'
import { getMe } from './api/customers'

function App() {
  const [token, setToken] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [customer, setCustomer] = useState([])

  useEffect(() => {
    const getInitialData = async () => {
        if(token) {
            const me = await getMe(token);
            setUser(me);
            setIsLoggedIn(true)
        }
    }
    getInitialData();
}, [])

  return (
    <div className="App">
      <NavBar token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn} setCustomer={setCustomer}/>
    </div>
  )
}

export default App
