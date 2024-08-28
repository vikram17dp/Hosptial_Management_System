import React, { useContext, useState } from 'react'
import  { useNavigate,Link } from 'react-router-dom'
import {Context} from  '../main'
import axios from 'axios';
import { toast } from 'react-toastify';
function NavBar() {
    const [show,setShow] = useState(false);
    const {isAuthenticated,setIsAutenticated} = useContext(Context);
    const navgiateTo = useNavigate()
    const handleLogout = async()=>{
        await axios.get("http://localhost:4004/api/v1/user/patient/logout",
        {withCredentials:true}).then((res)=>{
            toast.success(res.data.message);
            setIsAutenticated(false)

        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }
    const gotoLogin = async()=>{
        navgiateTo("/login")
    }
  return (
    <nav className='container'>
        <div className='logo'>ZeeCare</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>

        <div className="links">
            <Link to={"/"}>HOME</Link>
            <Link to={"/appointment"}>APPOINTMENT</Link>
            <Link to={"/about"}>ABOUTUS</Link>
        </div>


        {isAuthenticated ? (<button className='logoutBtn btn' onClick={handleLogout}>LOGOUT</button> ):( <button className='logoutBtn btn' onClick={gotoLogin}>LOGIN</button>)}
        </div>
       
    </nav>
  )
}

export default NavBar
