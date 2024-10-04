import React from 'react' // rfce + invio
import "../../styles/Posts.css";

import axios from 'axios';


function Posts(props) {

    const onDelete = async() =>{

        let response= await axios.delete("http://localhost:5555/posts/"+ props?.post?.id,
          {
            headers: {
              authToken:localStorage.getItem("AuthToken")
            }
          }
        )

    }

  return (
    <div className='post' id={props?.id}>
    <button className='buttonDelete' onClick={onDelete}> DELETE</button>
    <h3>{props?.post?.title}</h3>
    <p>{props?.post?.description}</p>
    <p className='postUser'>{props?.post?.user?.username}</p>
    </div>
  )
}
export default Posts