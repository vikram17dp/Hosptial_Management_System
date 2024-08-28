import React, { useState } from 'react'
import axios from 'axios'; 
import { toast } from 'react-toastify'; 

function Messageform() {
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [message,setMessage] = useState("");

  const handlemessage = async(e)=>{
    e.preventDefault();
    try {
      await axios.post("http://localhost:4004/api/v1/message/send",
        {firstName,lastName,email,phone,message},
        {
          withCredentials:true,
          headers:{
            "Content-Type":"application/json"
          }
        }).then((res)=>{
            toast.success(res.data.message)
            setFirstName("");
            setLastName("")
            setEmail("")
            setPhone("")
            setMessage("")
        })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className='container form-component message-form'>
      <h2>Send a message</h2>
     <form onSubmit={handlemessage}>
        <div>
          <input type="text" placeholder='firstName'value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
          <input type="text" placeholder='lastName' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
        
        </div>
        <div>
        <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="Number" placeholder='phone number' value={phone} onChange={(e)=>setPhone(e.target.value)} />
        </div>
        <textarea  rows={7} placeholder='Message' value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
        <div style={{justifyContent:"center", alignItems: "center" }}>
          <button  type="submit">Send</button>
        </div>
     </form>

      
    </div>
  )
}

export default Messageform
