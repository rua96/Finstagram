import React from "react";
import axios from "axios";
import "../../styles/SignUp.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp(props) {
  async function onSignUp(e) {
    e.preventDefault();

    const showPasswordInfo = () => {
      toast.info(
        "La password deve contenere almeno 8 caratteri, includere lettere maiuscole, numeri e simboli.",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { background: "#333", color: "#fff" },
        }
      );
    };

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
