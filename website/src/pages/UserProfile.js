import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/UserProfile.css";
import axios from "axios";
import Posts from "./components/Posts";
import Menu from "./components/Menu";

function UserProfile() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [menu, setMenu] = useState("");

  useEffect(() => {
    fetchData();
  }, [username]);

  const fetchData = async () => {
    try {
      let response = await axios.get(
        "http://localhost:5555/posts/" + username,

        {
          headers: {
            authToken: localStorage.getItem("AuthToken"),
          },
        }
      );

      setPosts(response?.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const deletePost = (postId) => {
    // Aggiorna lo stato dei post per rimuovere il post eliminato
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };
  return (
    <div className="UserProfile">
      <h1 className="finstagram">FINSTAGRAM </h1>
      <br />
      <h1> {username} </h1>
      <h2>Posts</h2>
      {posts.length >= 1 &&
        posts?.map((post) => {
          return (
            <Posts
              key={post.id}
              post={post}
              username={username}
              deletePost={deletePost}
            />
          );
        })}
      <Menu setMenu={(value) => setMenu(value)} menu={menu} />
    </div>
  );
}

export default UserProfile;
