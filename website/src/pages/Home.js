import React, {useState, useContext} from 'react'
import CreatePostForm from './components/CreatePostForm';
import ShowPosts from './components/ShowPosts';
import Menu from './components/Menu';
import "../styles/Home.css"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';


function Home() {

  const [menu,setMenu] = useState("Show");
  const navigate= useNavigate;
  const {login}=useContext(AuthContext);



  return (
    <div  className="homepage" >

          <h1 className='finstagram'>FINSTAGRAM </h1>
          <div className='Contents'>
    {
          menu === "Show"
        ?
    
      <ShowPosts/>
       
      :
        
      <CreatePostForm/>
      }
      

         </div>
                <br/>
                       <Menu setMenu={(value)=> setMenu(value) }
              menu={menu}
              username = {login.username}/>       
      
          </div>
  );
}

export default Home