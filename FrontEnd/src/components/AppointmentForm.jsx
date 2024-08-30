import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function AppointmentForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [AadhaarNumber, setAadhaarNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const navigateTo = useNavigate();
  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
    "Denitist",
  ];
  const [doctors,setDoctors] = useState([]);
  useEffect(()=>{
    const fetchDoctors = async()=>{
      try {
        const {data} = await axios.get("http://localhost:4004/api/v1/user/doctors",{
          withCredentials: true
        });
        setDoctors(data.doctors);
        console.log('Doctors fetched:', data.doctors);
      } catch (error) {
        console.log(error.response.data);
        toast.error(error.response.data.message)
        // console.error("Error details:", error.response ? error.response.data : error.message);
        // toast.error(error.response ? error.response.data.message : "An error occurred");
      }
    };
    fetchDoctors();
  },[]);
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone || !AadhaarNumber || !dob || !gender || !appointmentDate || !department || !doctorFirstName || !doctorLastName || !address) {
      toast.error("Please fill full form");
      return;
    }
    console.log({
      firstName,
      lastName,
      email,
      phone,
      AadhaarNumber,
      dob,
      gender,
      appointment_date: appointmentDate,
      department,
      doctor_firstName: doctorFirstName,
      doctor_lastName: doctorLastName,
      hasVisited,
      address,
    });
  
    try {
      const { data } = await axios.post("http://localhost:4004/api/v1/appointment/post", {
        firstName,
        lastName,
        email,
        phone,
        AadhaarNumber,
        dob,
        gender,
        appointment_date: appointmentDate,
        department,
        doctor_firstName: doctorFirstName,
        doctor_lastName: doctorLastName,
        hasVisited: !!hasVisited,
        address,
      }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
        Authorization: `Bearer ${token}`,
      });
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAadhaarNumber("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("Pediatrics");
      setDoctorFirstName("");
      setDoctorLastName("");
      setHasVisited(false);
      setAddress("");
      navigateTo('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className='container form-component register-form'>
       <h2 className='registerh2'>Appointment Form</h2>
       
        <form onSubmit={handleRegister}>
          <div>
            <input type="text" placeholder='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
            <input type="text" placeholder='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)} />

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
            <input type="date" value={appointmentDate} onChange={(e)=>setAppointmentDate(e.target.value)} placeholder='AppointmentDate'/>
          </div>
          <div>
            <select value={department} onChange={(e)=>{
              setDepartment(e.target.value)
              setDoctorFirstName("");
              setDoctorLastName("")
            }}>
                {
                  departmentsArray.map((depart,index)=>{
                    return (
                      <option value={depart} key={index}>{depart}</option>
                    )
                  })
                }
            </select>
            <select value={`${doctorFirstName} ${doctorLastName}`}
              onChange={(e)=>{
                const [firstName,lastName] = e.target.value.split(" ");
                setDoctorFirstName(firstName);
                setDoctorLastName(lastName);
                console.log('Doctor Selected:', firstName, lastName);
                console.log('Department:', department);
              }}
              disabled={!department}
            >
              <option value="">Select Doctor</option>
              {
                doctors.filter(doctor=>doctor.doctorDepartment===department).map((doctor,index)=>{
                  return (
                    <option value={`${doctor.firstName} ${doctor.lastName}`} key={index}>
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  )
                })
              }
            </select>
          </div>
          <textarea rows="3" placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)}>

          </textarea>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have You Already Visited?</p>
           <input type="checkbox" checked={hasVisited} onChange={(e)=>setHasVisited(e.target.checked)}
           style={{flex:"none",width:"25px"}}
           />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Get Appointment</button>
          </div>

        </form>
      
    </div>
    </>
  )
}

export default AppointmentForm
