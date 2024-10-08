import React from 'react'   //rfce
import "../../styles/ShowPosts.css"
import axios from 'axios'
import Posts from './Posts'
import {useEffect, useState} from "react";

function ShowPosts() {
    const[posts, setPosts] = useState([]);
    const[loading,setLoading] = useState(true);
    useEffect(() => {
        getShowPosts();

    },[])

        const getShowPosts = async () => {
            let response = await axios.get("http://localhost:5555/posts",
                {
                    headers:  {
                        authToken: localStorage.getItem("AuthToken")
                    }
                })

                console.log("Res", response)

        if(response?.data?.error) {
            console.log(response.data.error);
            } else {
            setPosts(response?.data)
            }
            setLoading(false);
                  
        } 
        if(loading) {
            return <></>
        }
  
    return (
         <>   <h1> Show Posts </h1>
             { posts?.map((post) => {
                 return(
                    <Posts post={post}/>)
        })
        }
    </>
)
  



}



export default ShowPosts
