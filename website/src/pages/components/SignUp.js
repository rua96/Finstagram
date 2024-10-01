import React from 'react'
import axios from 'axios'
import "../../styles/SignUp.css"

function SignUp(props) {

     async function onSignUp(e)  {
    
      e.preventDefault();

      console.log("E", e.target[0].value , e.target[1].value,e.target[2].value);

      let response = await axios.post( 
       "http://localhost:5555/users",

      {
        email:e.target[0].value,
        username: e.target[1].value,
        password: e.target[2].value,
      }   
    )
     console.log(response.data);
  }
  

    return (

      <div>
        <h1> FINSTAGRAM  </h1>
            <h2> SIGN-UP </h2>
       <form className="signup" onSubmit={onSignUp}>
            
             <input type="email" placeholder= "Email"/>
             <input type="text" placeholder="Username"/>
             <input type="password" placeholder="Password" />
            <button type="submit"> SIGN UP </button>
            <button type="button"
            onClick={() => props.changeToLogin()}
            >Log In</button>
        </form>
        </div>
    )
}

export default SignUp