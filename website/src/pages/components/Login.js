import React,{useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../services/AuthContext';
import "../../styles/Login.css"
import Validation from '../../services/Validation'
import { toast } from "react-toastify"

function Login(props) {

    const navigate =useNavigate();
    const {setLogin} = useContext(AuthContext);

     async function onLogin(e)  {
    
      e.preventDefault();

      console.log("E", e.target[0].value , e.target[1].value);

      if(!e.target[0].value){
        toast.success("put your username")
        return;
      }

      if(!e.target[1].value){
        toast.success("put your password")
        return;
      };

    let response= await axios.post("http://localhost:5555/users/login",
        {
          ...(Validation.isEmail(e.target[0].value) ? {email:e.target[0].value} : {username: e.target[0].value}),
          password: e.target[1].value
        }

      )
     
      if(response?.data?.error) {
        toast.error("Error", response.data.error);
      }else if(response?.data?.status) {
        setLogin({
          email: response?.data?.email,
          username: response?.data?.username,
        })
        localStorage.setItem("AuthToken",response?.data?.authToken);
        navigate("/home");
        toast.success("You have logged in!")

        }
      }
      return (            
    <div>    <h1> FINSTAGRAM </h1>
     <h2> LOGIN </h2>
        <form className="Login" onSubmit={onLogin}>

           
             <input type="text" placeholder="Email o Username"/>
             <input type="password" placeholder="Password" />
            <button type="submit"> LOGIN </button>
            <button type="button"
            onClick={() => props.changeToSignUp()}
            >SignUp</button>
        </form>
  </div> 
   )
}

export default Login