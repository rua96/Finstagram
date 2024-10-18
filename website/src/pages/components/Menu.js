import React, {useContext} from 'react'
import { AuthContext } from '../../services/AuthContext'
import { useNavigate } from 'react-router-dom'
import "../../styles/Menu.css"
import { toast } from 'react-toastify';
import HomeActive from "../../assets/homebianca.svg";
import HomeInactive from '../../assets/homenera.svg';
import PlusActive from "../../assets/addBianco.svg";
import PlusInactive from "../../assets/addColorato.svg";
import LogoutIcon from "../../assets/logout.svg";
import UserWhite from "../../assets/profilonero.svg"; 
import UserBlack from "../../assets/profilobianco.svg";





function Menu(props) {
    const navigate =useNavigate();
    const {setLogin} =useContext(AuthContext);
  
  
    const onLogout =() => {
      localStorage.removeItem("AuthToken")
      navigate("/entry")
      setLogin(false)
      toast.success("You have logged Out!")
    }

  return (
    <div  className="Menu">
        
            <div  className="start">
                <button className="buttonHome1" onClick={() => {props.setMenu("Show")}}>
                    <img class name="imma" src= {props.menu === "Show" ? HomeActive : HomeInactive} alt={'Home'} />
                </button>

                <button className="buttonHome1"onClick={() => {props.setMenu("Create")}}>
                  <img  src= {props.menu === "Show" ? PlusActive : PlusInactive} alt={'Create'} />
                </button>

                <button className="buttonHome1"onClick={() => navigate('/user/'+ props.username)}> 
                  <img src={props.menu === "Show" ? UserBlack : UserWhite} alt="Profile" />         
                </button>
                
                <button
                         className="buttonLogout" type="button" onClick={onLogout}><img class name="imma" src={LogoutIcon} alt="Logout" />
                </button>
              
       </div>
     </div>
  )
}

export default Menu