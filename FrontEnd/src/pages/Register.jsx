import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const {isAuthenticated,setIsAuthenticated} = useContext(Context);
  const [firstName,setfirstName] = useState("");
  const [lastName,setlastName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [AadhaarNumber,setAadhaarNumber] = useState("");
  const [dob,setDob] = useState("");
  const [gender,setGender] = useState("");
  const [password,setPassword] = useState("");
  const navigateTo = useNavigate();
  const handleRegister =async (e)=>{
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone || !AadhaarNumber || !dob || !gender || !password) {
      toast.error("Please fill out all fields.");
      return;
    }
    try {
      await axios.post("http://localhost:4004/api/v1/user/patient/register",
        {firstName,lastName,email,phone,AadhaarNumber,dob,gender,password,role:"Patient"},
        {
        withCredentials:true,
        headers:{"Content-Type": "application/json"}
      }).then((res)=>{
        toast.success(res.data.message);
        setIsAuthenticated(true);
        navigateTo('/')
        setfirstName("");
        setlastName("");
        setEmail("");
        setPhone("");
        setAadhaarNumber("");
        setDob("");
        setGender("");
        setPassword("")
      })
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  if(isAuthenticated){
    return <Navigate to={'/'}/>
  }



  
  return (
    <div className='container form-component register-form'>
       <h2 className='registerh2'>Sign Up</h2>
        <p className='registerp'>Please Sign Up To Continue</p>
        <p className='registerp2'>
        "Join us by completing the signup form."
        </p>
        <form onSubmit={handleRegister}>
          <div>
            <input type="text" placeholder='First Name' value={firstName} onChange={(e)=>setfirstName(e.target.value)} />
            <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=>setlastName(e.target.value)} />

          </div>
          <div>
            <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="number" placeholder='Phone Number' value={phone} onChange={(e)=>setPhone(e.target.value)} />
          </div>
          <div>
            <input type="number" placeholder='AadhaarNumber' value={AadhaarNumber} onChange={(e)=>setAadhaarNumber(e.target.value)} />
            <input type="date" placeholder='Date of Birth' value={dob} onChange={(e)=>setDob(e.target.value)} />
          </div>
          <div>

            <select  value={gender} onChange={(e)=>setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
          
            </select>
            <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>
          </div>

        </form>
      
    </div>
  )
}

export default Register
