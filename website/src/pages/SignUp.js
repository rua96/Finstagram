import React from 'react'
import axios from 'axios'
import "../styles/SignUp.css"

function SignUp() {

     async function onSignUp(e)  {
    
      e.preventDefault();

      console.log("E", e.target[0].value , e.target[1].value,e.target[2].value);

      let response = await axios.post( 
       "http://localhost:5555/users",

      {
        email:e.target[0].value,
        password: e.target[1].value,
        username: e.target[2].value,
      }   
    )
     console.log(response.data);
  }
  

    return (
       <form className="signup" onSubmit={onSignUp}>
            <h1> FINSTAGRAM </h1>
             <input type="email" placeholder= "email"/>
             <input type="password" placeholder="password" />
             <input type="text" placeholder="username"/>
            <button type="submit"> SIGN UP </button>
        </form>
    )
}

export default SignUp