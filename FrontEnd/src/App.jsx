import React, { useContext, useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Appointment from './pages/Appointment'
import AboutUs from './pages/AboutUs'
import Register from './pages/Register'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar'
import { Context } from './main'
import axios from 'axios'

const App = () => {
  const {isAuthenticated,setIsAutenticated,user,setUser} = useContext(Context);
  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        await axios.get("http://localhost:4004/api/v1/user/patient/me",{withCredentials:true});
        setIsAutenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAutenticated(false);
        setUser({});
      }
    }
    fetchUser();
  },[isAuthenticated])

  return (
    <>

      <Router>
        <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/appointment' element={<Appointment/>}/>
            <Route path='/about' element={<AboutUs/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
          <ToastContainer position='top-center'/>

        </Router> 
    </>
  )
}

export default App
