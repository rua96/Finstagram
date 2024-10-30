import React from "react";
import axios from "axios";
import "../../styles/SignUp.css";
import { toast } from "react-toastify";

function SignUp(props) {
  async function onSignUp(e) {
    e.preventDefault();

    console.log("E", e.target[0].value, e.target[1].value, e.target[2].value);

    console.log("E", e.target[0].value, e.target[1].value);

    if (!e.target[0].value) {
      toast.success("Put your Email!");
      return;
    }

    if (!e.target[1].value) {
      toast.success("Put your Username!");
      return;
    }

    console.log("E", e.target[0].value, e.target[1].value);

    if (!e.target[2].value) {
      toast.success("Put your Password!");
      return;
    }

    let response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/users",

      {
        email: e.target[0].value,
        username: e.target[1].value,
        password: e.target[2].value,
      }
    );
    toast.success("Utente Creato!");
    console.log(response.data);
  }

  return (
    <div>
      <h1> FINSTAGRAM </h1>
      <h2> SIGN-UP </h2>
      <form className="signup" onSubmit={onSignUp}>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit"> SIGN UP </button>
        <button type="button" onClick={() => props.changeToLogin()}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default SignUp;
