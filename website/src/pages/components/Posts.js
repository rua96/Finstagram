import React, { useContext, useEffect, useState } from "react";
import "../../styles/Posts.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../services/AuthContext";
import { useNavigate } from "react-router-dom";
import DateService from "../../services/Date";
import LikeSection from "./Like";
import CommentsSection from "./CommentsSection";
import CommentIcon from "../../assets/comments.svg";

function Posts(props) {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentlength, setCommentLength] = useState(0);

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
  }, [props]);

  // Prendi la prima immagine associata al post (se presente)
  const imageUrl =
    props?.post?.postImages && props?.post?.postImages.length > 0
      ? props.postImages[0].imageUrl
      : null;

  const onDelete = async () => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_SERVER_URL + "/posts/" + props?.post?.id,
        {
          headers: {
            authToken: localStorage.getItem("AuthToken"),
          },
        }
      );

      if (response.status === 200) {
        props.deletePost(props?.post?.id);
        toast.success("You have deleted your post");
      } else {
        toast.error(
          "Error deleting the post: " + response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      toast.error(
        "Error deleting the post: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="post" id={props?.post?.id}>
      {login.username === username && (
        <button className="buttonDelete" onClick={onDelete}>
          X
        </button>
      )}
      <div className="formPosts">
        <div className="formPostsdiv">
          {imageUrl ? (
            <img width="100%" height="100%" src={imageUrl} alt="Post Image" />
          ) : (
            <>Loading...</>
          )}
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
            onClick={() => setToggle(!toggle)}
          >
            <img className="immacomment" src={CommentIcon} alt="Comments" />
            Comment {commentlength}
          </button>
        </div>

        {toggle ? (
          <CommentsSection
            postId={props?.post?.id}
            comments={props?.post?.postsComments}
            addcomment={() => setCommentLength(commentlength + 1)}
          />
        ) : null}
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
