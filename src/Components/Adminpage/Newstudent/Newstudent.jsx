import React, { useState, useEffect } from 'react';

const Newstudent = ({ existingStudent, onClose, refreshData }) => {
  const [student, setStudent] = useState({
    studentName: '',
    fatherName: '',
    previousClass: '',
    presentClass: '',
    age: '',
    address: '',
    parentEmailAddress: '',
    parentPhoneNumber: '',
    dateOfBirth: '',
    image: null,
    aadharCardNumber: '',
    nationality: '',
    religion: '',
    gender: '',
    MotherTongue: ''
  });

  // Initialize form with existing student data
  useEffect(() => {
    if (existingStudent) {
      // Format date for date input
      const formattedDate = existingStudent.dateOfBirth?.split('T')[0] || '';
     setStudent(prev => ({
  ...prev,
  ...existingStudent,
  dateOfBirth: formattedDate
}));
    } else {
      // Reset form for new student
      setStudent({
        studentName: '',
        fatherName: '',
        previousClass: '',
        presentClass: '',
        age: '',
        address: '',
        parentEmailAddress: '',
        parentPhoneNumber: '',
        dateOfBirth: '',
        image: null,
        aadharCardNumber: '',
        nationality: '',
        religion: '',
        gender: '',
        MotherTongue: ''
      });
    }
  }, [existingStudent]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setStudent({ ...student, [name]: files[0] });
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append all fields to formData
  Object.keys(student).forEach(key => {
  // Do not send admissionNumber if creating new student
  if (!existingStudent && key === 'admissionNumber') return;
  if (student[key] !== null && student[key] !== undefined) {
    formData.append(key, student[key]);
  }
});


    try {
      const url = existingStudent 
        ? `http://localhost:4000/admin/students/${student._id}`
        : 'http://localhost:4000/admin/students';
      
      const method = existingStudent ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formData
      });

      if (response.ok) {
        if (refreshData) refreshData();
        if (onClose) onClose();
      } else {
        console.error('Error:', await response.text());
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{existingStudent ? 'Update' : 'Add'} Student Details</h2>
      <form onSubmit={handleSubmit}>
       <div className="input-group">
  <input
    type="text"
    name="studentName"
    value={student.studentName}
    onChange={handleChange}
    placeholder="Enter Student Name"
    required
  />
  <label>Student Name</label>
</div>

<div className="input-group">
  <input
    type="text"
    name="fatherName"
    value={student.fatherName}
    onChange={handleChange}
    placeholder="Enter Father's Name"
    required
  />
  <label>Father's Name</label>
</div>

<div className="input-group">
  <input
    type="text"
    name="previousClass"
    value={student.previousClass}
    onChange={handleChange}
    placeholder="Enter Previous Class"
    required
  />
  <label>Previous Class</label>
</div>

<div className="input-group">
  <input
    type="text"
    name="presentClass"
    value={student.presentClass}
    onChange={handleChange}
    placeholder=" Enter Present Class"
    required
  />
  <label>Present Class</label>
</div>

<div className="input-group">
  <select
    name="gender"
    value={student.gender}
    onChange={handleChange}
    required
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
  <label>Gender</label>
</div>

<div className="input-group">
  <input
    type="number"
    name="age"
    value={student.age}
    onChange={handleChange}
    placeholder="Enter Age"
    required
  />
  <label>Age</label>
</div>

<div className="input-group">
  <input
    type="text"
    name="aadharCardNumber"
    value={student.aadharCardNumber}
    onChange={handleChange}
    placeholder="Enter Aadhar Card Number"
    required
  />
  <label>Aadhar Card Number</label>
</div>

<div className="input-group">
  <textarea
    name="address"
    value={student.address}
    onChange={handleChange}
    placeholder="Enter Address"
    required
  />
  <label>Address</label>
</div>

<div className="input-group">
  <input
    type="email"
    name="parentEmailAddress"
    value={student.parentEmailAddress}
    onChange={handleChange}
    placeholder="Enter Parent's Email"
    required
  />
  <label>Parent Email</label>
</div>

<div className="input-group">
  <input
    type="tel"
    name="parentPhoneNumber"
    value={student.parentPhoneNumber}
    onChange={handleChange}
    placeholder="Enter Parent's Phone Number"
    pattern="[0-9]{10}"
    required
  />
  <label>Parent Phone</label>
</div>

<div className="input-group">
  <input
    type="date"
    name="dateOfBirth"
    value={student.dateOfBirth}
    onChange={handleChange}
    placeholder="Enter Date of Birth"
    min="1900-01-01"
    required
  />
  <label>Date of Birth</label>
</div>

<div className="input-group">
  <input
    type="file"
    name="image"
    onChange={handleChange}
  />
  <label>Student Image</label>
  {existingStudent?.image && !(student.image instanceof File) && (
    <p className="current-image">Current: {existingStudent.image}</p>
  )}
</div>

<div className="input-group">
  <input
    type="text"
    name="nationality"
    value={student.nationality}
    onChange={handleChange}
    placeholder="Enter Nationality"
    required
  />
  <label>Nationality</label>
</div>

<div className="input-group">
  <input
    type="text"
    name="religion"
    value={student.religion}
    onChange={handleChange}
    placeholder="Enter Religion"
    required
  />
  <label>Religion</label>
</div>

<div className="input-group">
  <input
    type="text"
    name="MotherTongue"
    value={student.MotherTongue}
    onChange={handleChange}
    placeholder="Enter Mother Tongue"
    required
  />
  <label>Mother Tongue</label>
</div>

       

        <div className="form-actions">
          <button type="submit" className="submit-button">
            {existingStudent ? 'Update Student' : 'Add Student'}
          </button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Newstudent;