import React , {useContext, useEffect, useState}from 'react' // rfce + invio
import "../../styles/Posts.css";
import axios from 'axios';
import {toast} from "react-toastify";
import { AuthContext } from '../../services/AuthContext';


function Posts(props) {
  const {login} = useContext (AuthContext);
  const [username,setUsername] = useState("");

  useEffect(()=> {

    if(props?.username) {
        setUsername(props?.username);
      } else if(props?.post?.user?.username) {
        setUsername(props?.post?.user?.username);
      }
      
            

  }, [props])

    const onDelete = async() =>{

        let response= await axios.delete("http://localhost:5555/posts/"+ props?.post?.id,
          {
            headers: {
              authToken:localStorage.getItem("AuthToken")
            }
          }
        )
        props.deletePost(props?.post?.id)
        toast.success("You have Delected Your Post")

    }

  return (
    <div className='post' id={props?.post?.id}>
    {
      login.username === username?
      <button className='buttonDelete' onClick={onDelete}> X </button>
    
    : <></>
    }
    <h3>{props?.post?.title}</h3>
    <p className='description'>{props?.post?.description}</p>
    <p className='date'>{props?.post?.createdAt}</p>
    <p className='postUser'>{props?.post?.user?.username}</p>
    </div>
  )
}
export default Posts