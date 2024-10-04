import React, {useState} from 'react'
import CreatePostForm from './components/CreatePostForm';
import ShowPosts from './components/ShowPosts';
import Menu from './components/Menu';
import "../styles/Home.css"



function Home() {

  const [menu,setMenu] = useState("Show");



  return (
    <div  className="homepage">

          <h1>FINSTAGRAM </h1>
          <br></br>
              <Menu setMenu={(value)=> setMenu(value) }/>       
        <br></br>
        <br></br>
          <h2>HOME</h2>
          <div className='Contents'>
    {
          menu === "Show"
        ?
    
      <ShowPosts/>
       
      :
        
      <CreatePostForm/>
      }
      

         </div>
    </div>
  );
}

export default Home