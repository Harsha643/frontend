import React from 'react'
import "./Admin.css"
import {useNavigate} from "react-router-dom"

const Admin = () => {
  const navigate=useNavigate()
  return (
    <>
    <div className="container-Admin">
    <h1 onClick={()=>navigate("/Newstudent")}>Admission</h1>
      <h1 onClick={()=>navigate("/Studentsdata")}>Student Management</h1>
      <h1 onClick={()=>navigate("/Newstaff")}>Staffadding </h1>
      <h1 onClick={()=>navigate("/Staffdata")}>Staff management</h1>
      <h1 onClick={()=>navigate("/Events")}>Events</h1>
      <h1 onClick={()=>navigate("/Timetable")}>Time Table</h1>
      <h1 onClick={()=>navigate("/Assign")}>Subject and class</h1>
      <h1 onClick={()=>navigate("/feemanagement")}>Fee Management</h1>
      <h1 onClick={()=>{navigate("/ClassManagement")}}>Class Management</h1>
      <h1 onClick={()=>navigate("/Notes")}>Notes</h1>
      <h1 onClick={()=>navigate("/Attendance")}>Attendance</h1>
      <h1 onClick={()=>navigate("/Feedback")}>Feedback</h1>
      <h1  onClick={()=>navigate("/Gallery")}>Gallery</h1>
    </div>
    
    </>
  )
}

export default Admin
