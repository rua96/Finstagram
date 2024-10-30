import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../../styles/CommentCreate.css";

function CommentCreate(props) {
  const [comment, setComment] = useState("");

  const createComment = async (e) => {
    e.preventDefault();

    console.log("createComment", comment, props?.postId);

    let response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/postsComments",
      {
        comment: comment,
        postId: props?.postId,
      },
      {
        headers: {
          authToken: localStorage.getItem("AuthToken"),
        },
      }
    );
    toast.success("Il tuo Commento è stato creato! ");
    props.onCreate(response?.data);
    setComment("");
  };
  return (
    <form onSubmit={createComment}>
      <textarea
        className="textareacommenti"
        type="text"
        placeholder="Comment"
        value={comment} // Il valore del textarea è legato allo stato
        onChange={(e) => setComment(e.target.value)} // Aggiorna lo stato ad ogni cambiamento
      />
      <button type="submit" className="pubblicacommento">
        Publish
      </button>
    </form>
  );
}

export default CommentCreate;
