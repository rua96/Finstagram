import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../services/AuthContext";
import CreatePostForm from "./components/CreatePostForm";
import ShowPosts from "./components/ShowPosts";
import Menu from "./components/Menu";
import "../styles/Home.css";
import { useLocation } from "react-router-dom";

function Home() {
  const [menu, setMenu] = useState("Show");
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const { state } = location;
  useEffect(() => {
    if (state) {
      setMenu(state?.menuState);
      console.log("menu", location);
    }
  }, [location]);

  return (
    <div className="homepage">
      <h1 className="finstagram">FINSTAGRAM </h1>
      <div className="Contents">
        {menu === "Show" ? <ShowPosts /> : <CreatePostForm />}
      </div>
      <br />
      <Menu
        setMenu={(value) => setMenu(value)}
        menu={menu}
        username={login.username}
      />
    </div>
  );
}

export default Home;
