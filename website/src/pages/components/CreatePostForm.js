import React from 'react'   //rfce
import "../../styles/CreatePostForm.css"
import axios from 'axios'

function CreatePostForm() {
    const createPost = async (e) => {
        e.preventDefault();
        console.log(e.target[0].value,e.target[1].value)

    
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
