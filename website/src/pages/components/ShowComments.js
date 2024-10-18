import React,  { useEffect , useState} from 'react'
import Sorting from '../../services/Sorting';
import Comment from './Comment';
import "../../styles/ShowComments.css";


function GetAllComments(props) {

    const [comments, setComments] = useState([])

    useEffect(() => {
        if(props?.comments){
            setComments(props?.comments);
        }
    }, [props])

    const deleteComment= (id)  => {
        setComments(
            comments.filter((comments) => comments.id !== id)
        )
    }

  return (
    <>
        <h4>Comments</h4>
        <div className='Order'>
          <button type="button" className='buttonShow' 
            onClick= {() => setComments(Sorting.sortComments("newest", [... comments]))}
        >Newest</button>
        
        <button className='buttonShow' 
            onClick= {() => setComments(Sorting.sortComments("oldest", [... comments]))}
        > Oldest</button>
        </div>
        <div>


             { comments?.map((comment) => {
                 return(
                    <Comment comment={comment} deleteComment={deleteComment}/>
                )
        })}
        </div>
    </>

  )
}

export default GetAllComments