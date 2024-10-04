import React, {useContext} from 'react'
import { AuthContext } from '../../services/AuthContext'
import { useNavigate } from 'react-router-dom'
import "../../styles/Menu.css"



function Menu(props) {
    const navigate =useNavigate();
    const {setLogin} =useContext(AuthContext);
  
    const onLogout =() => {
      localStorage.removeItem("AuthToken")
      navigate("/entry")
      setLogin(false)
    }

  return (
    <div  className="Menu">
        
            <div  className="start">
                <button className="buttonHome" onClick={() => {props.setMenu("Show")}}>
                    SHOW
                </button>
                <button className="buttonHome"onClick={() => {props.setMenu("Create")}}>
                    CREATE
                </button>
            </div>
                <div>
                    <button
                         className="logout-button"
                         type="button" 
                        onClick={onLogout}>
                         LogOut
                    </button>
               </div>
    </div>
  )
}

export default Menu