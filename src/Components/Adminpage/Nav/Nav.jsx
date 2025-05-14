import React from 'react'
import "./nav.css"

const Nav = () => {
  return (
   <>
   <div className="header">
   <img src="/logo.png" alt="logo" width={"100px"} />
   <div className='insidediv'>
   <nav className='loginbtn'>Login</nav>
   <img src="/profile.png" alt="profile" width={"100px"} />
   </div>
    </div> 
   </>
  )
}

export default Nav
