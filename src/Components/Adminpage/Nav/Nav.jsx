import React,{useState,useEffect} from 'react'
import "./nav.css"

const Nav = () => {
    const [admin, setAdmin] = useState(null);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchProfile = async () => {
        const token = localStorage.getItem('token');
  
        const res = await fetch('http://localhost:4000/admin/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        const data = await res.json();
  
        if (res.ok) {
          setAdmin(data.data);
          
        } else {
          setError(data.msg || 'Failed to load admin data');
        }
      };
  
      fetchProfile();
    }, []);
  return (
   <>
   <div className="header">
   <img src="/logo.png" alt="logo" width={"100px"} />
    {admin ? (
      <div className='insidediv'>
        <nav className='loginbtn'>Welcome, {admin.name}</nav>
        <img src="/profile.png" alt="profile" width={"100px"} />
      </div>

    ) : (
      <div className='insidediv'>
        <nav className='loginbtn'>Login</nav>
        <img src="/profile.png" alt="profile" width={"100px"} />
      </div>
    )}
    </div>
     
   </>
  )

  
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
