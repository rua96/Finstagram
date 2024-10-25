import React, { useContext, useEffect, useState } from "react"; // rfce + invio
import "../../styles/Posts.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../services/AuthContext";
import { useNavigate } from "react-router-dom";
import DateService from "../../services/Date";
import LikeSection from "./Like";
import CommentsSection from "./CommentsSection";
import CommentIcon from "../../assets/comments.svg";
import Images from "../../services/Images";

function Posts(props) {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentlength, setCommentLength] = useState(0);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (props?.post?.title) {
      setLoading(false);
    }

    if (props?.username) {
      setUsername(props?.username);
    } else if (props?.post?.user?.username) {
      setUsername(props?.post?.user?.username);
    }
    if (props?.post?.postsComments?.length) {
      setCommentLength(props?.post?.postsComments?.length);
    }
    if (props?.post?.postImage?.key) {
      onGetImage(props?.post?.postImage?.key);
    }
    // console.log(props?.post?.postImage?.key);
  }, [props]);

  const onGetImage = async (key) => {
    setImage(await Images.getPostImage(key));
  };

  const onDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5555/posts/" + props?.post?.id,
        {
          headers: {
            authToken: localStorage.getItem("AuthToken"),
          },
        }
      );

      // Log della risposta per debug
      console.log("Delete response:", response);

      // Controlla se la risposta è positiva
      if (response.status === 200) {
        // Rimuovi il post dallo stato solo se l'eliminazione ha avuto successo
        props.deletePost(props?.post?.id);
        toast.success("You have deleted your post");
      } else {
        // Gestisci eventuali errori restituiti dal server
        toast.error(
          "Error deleting the post: " + response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      // Stampa l'errore per la diagnostica
      console.error(
        "Delete error:",
        error.response ? error.response.data : error
      );
      toast.error(
        "Error deleting the post: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="post" id={props?.post?.id}>
      {login.username === username ? (
        <button className="buttonDelete" onClick={onDelete}>
          {" "}
          X{" "}
        </button>
      ) : (
        <></>
      )}
      <div className="formPosts">
        <div className="formPostsdiv">
          <h3>{props?.post?.title}</h3>
          <p className="description">{props?.post?.description}</p>
          <p className="date">
            {DateService.formatDate(props?.post?.createdAt)}
          </p>
          <LikeSection
            postId={props?.post?.id}
            likes={props?.post?.postsLikes}
          />
          <button
            type="button"
            className="ButtonPosts"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <img class name="immacomment" src={CommentIcon} alt="Comments" />
            Comment {commentlength}
          </button>
        </div>

        {toggle ? (
          <CommentsSection
            postId={props?.post?.id}
            comments={props?.post?.postsComments}
            addcomment={() => {
              setCommentLength(commentlength + 1);
            }}
          />
        ) : (
          <></>
        )}
        <div>
          <button
            className="postUser"
            onClick={() => navigate("/user/" + username)}
          >
            {username}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Posts;
