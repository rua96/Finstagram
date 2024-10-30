import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../services/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DateService from "../../services/Date";
import "../../styles/Comments.css";

function Comment(props) {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(props?.comment);

    if (props?.comment?.comment) {
      setUsername(props?.comment?.user?.username);
      setLoading(false);
    }
  }, [props]);

  const onDelete = async () => {
    let response = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "/postsComments/" + props?.comment?.id,

      {
        headers: {
          authToken: localStorage.getItem("AuthToken"),
        },
      }
    );

    props.deleteComment(props?.comment?.id);
    toast.success("You have Deleted Your Comment");
  };

  if (loading) {
    return <></>;
  }

  return (
    <div className="Commenti" id={props?.id}>
      <p className="pCommenti">{props?.comment?.comment}</p>
      <p className="pdata">
        {DateService.formatDate(props?.comment?.createdAt)}
      </p>
      <div className="CommentButtons">
        <button
          className="ButtonCo"
          onClick={() => {
            navigate("/user/" + username);
          }}
        >
          {username}
        </button>
        {login.username === username ? (
          <button
            className="ButtonDeleteComment"
            type="button"
            onClick={onDelete}
          >
            X
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default Comment;
