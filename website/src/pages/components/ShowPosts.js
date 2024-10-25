import React from "react"; //rfce
import "../../styles/ShowPosts.css";
import axios from "axios";
import Posts from "./Posts";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sorting from "../../services/Sorting";

function ShowPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("oldest");
  useEffect(() => {
    getShowPosts();
  }, []);

  const getShowPosts = async () => {
    let response = await axios.get("http://localhost:5555/posts", {
      headers: {
        authToken: localStorage.getItem("AuthToken"),
      },
    });

    console.log("Res", response.data);

    if (response?.data?.error) {
      toast.error("Error", response.data.error);
    } else {
      console.log("comments", response.data);
      setPosts(Sorting.sortPosts(order, response.data));
    }
    setLoading(false);
    console.log("comments", response?.data);
  };

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  if (loading) {
    return <></>;
  }

  return (
    <>
      {" "}
      <h1> Show Posts </h1>
      <div>
        <button
          className="buttonOld"
          onClick={(e) => {
            e.preventDefault();
            let orderedPosts = Sorting.sortPosts("oldest", [...posts]);
            setPosts(orderedPosts);
          }}
        >
          Oldest{" "}
        </button>
        <button
          className="buttonOld"
          onClick={(e) => {
            e.preventDefault();

            let orderedPosts = Sorting.sortPosts("newest", [...posts]);
            setPosts(orderedPosts);
          }}
        >
          Newest{" "}
        </button>
      </div>
      {posts?.length >= 1 &&
        posts?.map((post) => {
          return <Posts post={post} deletePost={deletePost} />;
        })}
    </>
  );
}

export default ShowPosts;
