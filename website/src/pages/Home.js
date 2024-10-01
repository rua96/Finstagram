import React, {useContext} from 'react'
import { AuthContext } from '../services/AuthContext'
import { useNavigate } from 'react-router-dom'
import CreatePostForm from './components/CreatePostForm';
import "../styles/Home.css"


function Home() {

  const navigate =useNavigate();
  const {setLogin} =useContext(AuthContext);

  const onLogout =() => {
    localStorage.removeItem("AuthToken")
    navigate("/entry")
    setLogin(false)
  }


  return (
    <div>
      
        <h1>FINSTAGRAM </h1>
        <h2>HOME</h2>
      
     <CreatePostForm />
    <button
    className="logout-button"
       type="button" 
       onClick={onLogout}>
        LogOut
      </button>
    </div>
  );
}

export default Home