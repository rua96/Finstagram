import React, { useEffect , useState, useContext} from 'react'
import CommentCreate from './CommentCreate';
import ShowComments from './ShowComments';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sorting from '../../services/Sorting';
import { AuthContext } from '../../services/AuthContext';
import "../../styles/CommentsSection.css";

function CommentsSection(props) {

  const [loading, setLoading] = useState(true);
  const [comments,setComments] = useState ([]);
  const {login}=useContext(AuthContext);

  useEffect(() => {
      fetchComments()
  },[props]) 

  const fetchComments = async ()=>{   
    let response = await axios.get("http://localhost:5555/postsComments/" + props?.postId,
        {
            headers: {
                authToken: localStorage.getItem("AuthToken")
            }
        })

        console.log(response.data, "Response console")

        if(response?.data?.error) {
            toast.error(response.data.error);
        } else if(response?.data) {
            setComments(Sorting.sortComments("newest",response.data))
        }
    setLoading(false);
  }



  const onCreate = (comment) => {
    setComments(
      [
        {
          ...comment,
          user: {
            username: login.username
          }
        }
        , ...comments
      ]
  )

  }

  if(loading) {
      return <></>
  }

  return (
    <div className='CommentsSection'>
        <ShowComments postId={props?.postId} comments={comments}/>
        <CommentCreate postId={props?.postId} onCreate={onCreate}/>
    </div>
)
}

export default CommentsSection