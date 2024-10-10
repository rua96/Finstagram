import React from 'react'   //rfce
import "../../styles/CreatePostForm.css"
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'

function CreatePostForm() {

    const navigate = useNavigate();

    const createPost = async (e) => {
        e.preventDefault();
        
        
        await axios.post("http://localhost:5555/posts",
            
            {
                title : e.target[0].value,
                description: e.target[1].value,
            },
            
            {
                headers:  {
                    authToken: localStorage.getItem("AuthToken")
                }
            }
            
        )
        toast.success("Il tuo Post è stato creato! ")
        navigate("/showposts")
        
    }
  
    return (
        <form className="PostForm create-post-form" onSubmit={createPost} >
         <h3> CREATE POST </h3>
          <input type="text" placeholder= "Title"/>
          <textarea type="text" placeholder="Description"/>
         <button type="submit"> PUBLISH </button>
        {/*  <button type="button"
         onClick={() => props.changeToLogin()}
         >Log In</button> */}
     </form>
 )
  



}



export default CreatePostForm
