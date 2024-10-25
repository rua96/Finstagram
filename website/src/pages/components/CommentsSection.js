import React, { useEffect, useState, useContext } from "react";
import CommentCreate from "./CommentCreate";
import ShowComments from "./ShowComments";
import axios from "axios";
import { toast } from "react-toastify";
import Sorting from "../../services/Sorting";
import { AuthContext } from "../../services/AuthContext";
import "../../styles/CommentsSection.css";

function CommentsSection(props) {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    setComments(Sorting.sortComments("newest", props?.comments));
    setLoading(false);
  }, [props]);

  if (loading) {
    return <></>;
  }

  const onCreate = (comment) => {
    setComments([
      {
        ...comment,
        user: {
          username: login.username,
        },
      },
      ...comments,
    ]);
  };

  return (
    <div className="CommentsSection">
      <CommentCreate
        postId={props?.postId}
        onCreate={onCreate}
        addComment={() => {
          props?.addcomment();
        }}
      />
      <ShowComments postId={props?.postId} comments={comments} />
    </div>
  );
}

export default CommentsSection;
