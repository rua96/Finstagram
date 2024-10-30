import React, { useContext, useState, useEffect } from "react";
import LikeActive from "../../assets/cuoreColorato.svg";
import LikeInactive from "../../assets/cuoreBianco.svg";
import { toast } from "react-toastify";
import "../../styles/Like.css";
import { AuthContext } from "../../services/AuthContext";
import axios from "axios";

function LikeSection(props) {
  const { login } = useContext(AuthContext);
  const [like, setlike] = useState(false);
  const [numLikes, setnumLikes] = useState(-1);

  useEffect(() => {
    setlike(
      props?.likes?.filter((row) => {
        return login?.id === row?.userId;
      })[0]?.like
    );
    setnumLikes(
      props?.likes?.filter((row) => {
        return row?.like === true;
      })?.length
    );
  }, [props?.likes]);

  const changeLike = async () => {
    let response = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/postsLikes",
      {
        like: !like,
        postId: props?.postId,
      },
      {
        headers: {
          authToken: localStorage.getItem("AuthToken"),
        },
      }
    );
    setnumLikes(like ? numLikes - 1 : numLikes + 1);
    setlike((value) => !value);
    toast.success("You have liked the Post");
  };

  return (
    <div className="MenuLike">
      <button className="buttonLike" onClick={changeLike}>
        <img
          class
          name="iLike"
          src={like ? LikeActive : LikeInactive}
          alt="Like"
        />
      </button>
      <p>LIKES : {numLikes} </p>
    </div>
  );
}
export default LikeSection;
