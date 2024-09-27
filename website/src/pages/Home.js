import React, {useContext} from 'react'
import { AuthContext } from '../services/AuthContext'
import { useNavigate } from 'react-router-dom'
import "../styles/Home.css"


function Home() {

  const navigate =useNavigate();
  const {login,setLogin} =useContext(AuthContext);

  const onLogout =() => {
    localStorage.removeItem("AuthToken")
    navigate("/entry")
    setLogin(false)
  }


  return (
    <div>
      
        <h1>FINSTAGRAM </h1>
        <h2>HOME</h2>
        <h2>{login ? "LOGGED IN" : "Logged Out"} </h2>
      
      

      <button
       type="button" 
       onClick={onLogout}>
        LogOut
      </button>
    </div>
  )
}

export default Home