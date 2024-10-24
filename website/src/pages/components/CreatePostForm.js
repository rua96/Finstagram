import React , {useState} from 'react'   //rfce
import "../../styles/CreatePostForm.css"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function CreatePostForm() {

    
    const[image,setImage] = useState({})
    const navigate = useNavigate();

    const createPost = async (e) => {
        e.preventDefault();
        
        
        let response = await axios.post("http://localhost:5555/posts",
            
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

        if(response?.data) {

            const data = new FormData();
            data.append('file',image)

            let imageResponse = await axios.post("http://localhost:5555/images/upload",
            data, 
            {
                headers:  {
                    authToken: localStorage.getItem("AuthToken")
                }
            }
    )
        toast.success("Il tuo Post è stato creato! ")
        navigate("/showposts")
        
    }
}
    const onSetImage =(e)=> {
        setImage(e.target.files[0]);
    }

  
    return (
        <form className="PostForm create-post-form" onSubmit={createPost} >
         <h3> CREATE POST </h3>
          <input type="text" placeholder= "Title"/>
          <textarea type="text" placeholder="Description"/>
          <input
           type='file'
           accept='image/png, image/jpg' 
           onChange={onSetImage}/>
         <button className= "bottonePost" type="submit"> PUBLISH </button>
        {/*  <button type="button"
         onClick={() => props.changeToLogin()}
         >Log In</button> */}
     </form>
 )
  



}



export default CreatePostForm
