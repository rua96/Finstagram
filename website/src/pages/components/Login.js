import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../../styles/Login.css"
import Validation from '../../services/Validation'

function Login(props) {

    const navigate =useNavigate();

     async function onLogin(e)  {
    
      e.preventDefault();

      console.log("E", e.target[0].value , e.target[1].value);

      if(!e.target[0].value){
        console.log("put your username")
        return;
      }

      if(!e.target[1].value){
        console.log("put your password")
        return;
      };

    let response= await axios.post("http://localhost:5555/users/login",
        {
          ...(Validation.isEmail(e.target[0].value) ? {email:e.target[0].value} : {username: e.target[0].value}),
          password: e.target[1].value
        }

      )
     
      if(response?.data?.error) {
        console.log("Error", response.data.error);
      }else if(response?.data?.login) {
        console.log("login")
          navigate("/home");
        }
      }
      
    return (
       <form className="Login" onSubmit={onLogin}>
            <h1> FINSTAGRAM 
            </h1>
            <h2> LOGIN </h2>
             <input type="text" placeholder="Email o Username"/>
             <input type="password" placeholder="Password" />
            <button type="submit"> LOGIN </button>
            <button type="button"
            onClick={() => props.changeToSignUp()}
            >SignUp</button>
        </form>
    )
}

export default Login