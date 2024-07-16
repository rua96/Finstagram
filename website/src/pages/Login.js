import React from 'react'
import axios from 'axios'
import "../styles/Login.css"

function Login() {

     async function onSignUp(e)  {
    
      e.preventDefault();

      console.log("E", e.target[0].value , e.target[1].value);

      let response = await axios.post( 
       "http://localhost:5555/users",

      {
        email:e.target[0].value,
        password: e.target[1].value
      }   
    )
     console.log(response.data);
  }
  

    return (
       <form className="Login" onSubmit={onSignUp}>
            <h1> FINSTAGRAM </h1>
             <input type="email" placeholder= "email"/>
             <input type="password" placeholder="password" />
            <button type="submit"> LOGIN </button>
        </form>
    )
}

export default Login