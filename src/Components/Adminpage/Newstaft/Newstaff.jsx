import React, { useState } from 'react'

const Newstaff = () => {
  const [Teachers, setTeachers] = useState([]);
  const [Teacher, setTeacher] = useState({
    TeacherName: "",
    subject: "",
    email: "",
    image: null,
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setTeacher({ ...Teacher, [name]: files[0] });
    } else {
      setTeacher({ ...Teacher, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("TeacherName", Teacher.TeacherName);
    formData.append("subject", Teacher.subject);
    formData.append("email", Teacher.email);
    formData.append("gender", Teacher.gender);
    formData.append("image", Teacher.image); // This must match Multer's expected field name

    try {
      const res = await fetch("http://localhost:4000/admin/staff", {
        method: "POST",
        body: formData // Don't set Content-Type header - browser will do it automatically
      });
      
      const data = await res.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1>Staff</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input 
          type="text" 
          name='TeacherName' 
          placeholder='Enter Teacher Name' 
          onChange={handleChange} 
          value={Teacher.TeacherName}
        />
        <input 
          type="text" 
          name='subject' 
          placeholder='Enter Subject Name' 
          onChange={handleChange}
          value={Teacher.subject}
        />
        <input 
          type="email" 
          name='email' 
          placeholder='Enter Email Address' 
          onChange={handleChange}
          value={Teacher.email}
        />
        <input 
          list="genders" 
          name="gender" 
          placeholder="Select Gender" 
          onChange={handleChange}
          value={Teacher.gender}
        />
        <datalist id="genders">
          <option value="Male" />
          <option value="Female" />
        </datalist>
        <input 
          type="file" 
          name='image' 
          onChange={handleChange} 
        />
        <input type="submit" value="Add Teacher Details" />
      </form>
    </>
  )
}

export default Newstaff