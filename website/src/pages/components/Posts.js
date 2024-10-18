import React, { useContext, useEffect, useState } from 'react'; // rfce + invio
import "../../styles/Posts.css";
import axios from 'axios';
import { toast } from "react-toastify";
import { AuthContext } from '../../services/AuthContext';
import { useNavigate } from 'react-router-dom';
import DateService from '../../services/Date';
import LikeSection from './Like';
import CommentsSection from './CommentsSection';
import CommentIcon from "../../assets/comments.svg";

function Posts(props) {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
  
    useEffect(() => {
        if (props?.username) {
            setUsername(props?.username);
        } else if (props?.post?.user?.username) {
            setUsername(props?.post?.user?.username);
        }
    }, [props]);

    const onDelete = async () => {
      try {
          const response = await axios.delete("http://localhost:5555/posts/" + props?.post?.id, {
              headers: {
                  authToken: localStorage.getItem("AuthToken")
              }
          });
  
          // Log della risposta per debug
          console.log("Delete response:", response);
  
          // Controlla se la risposta è positiva
          if (response.status === 200) {
              // Rimuovi il post dallo stato solo se l'eliminazione ha avuto successo
              props.deletePost(props?.post?.id);
              toast.success("You have deleted your post");
          } else {
              // Gestisci eventuali errori restituiti dal server
              toast.error("Error deleting the post: " + response.data.message || "Unknown error");
          }
      } catch (error) {
          // Stampa l'errore per la diagnostica
          console.error("Delete error:", error.response ? error.response.data : error);
          toast.error("Error deleting the post: " + (error.response?.data?.message || "Unknown error"));
      }
  };
  
    return (
        <div className='post' id={props?.post?.id}>
            {
                login.username === username ?
                    <button className='buttonDelete' onClick={onDelete}> X </button>
                : <></>
            }
            <h3>{props?.post?.title}</h3>
            <p className='description'>{props?.post?.description}</p>
            <p className='date'>{DateService.formatDate(props?.post?.createdAt)}</p>
            <LikeSection postId={props?.post?.id} likes={props?.post?.postsLikes} />
            <button type="button"  className="ButtonPosts" onClick={() => { setToggle(!toggle) }}> 
                <img class name="immacomment" src={CommentIcon} alt="Comments"/>
                
            </button>
            {
                toggle ?
                    <CommentsSection postId={props?.post?.id} />
                : <></>
            }
            <div>
                <button className='postUser' onClick={() => navigate('/user/' + username)}>{username}</button>
            </div>
        </div>
    );
}

export default Posts;
