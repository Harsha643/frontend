import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Newstaff.css';

const Newstaff = ({ existingStaff, onClose, refreshData }) => {
    const navigate = useNavigate();
  const [staff, setStaff] = useState({
    teacherName: '',
    gender: '',
    email: '',
    phoneNumber: '',
    address: '',
    image: null,
    aadharNumber: '',
    designation: '',
    exprerence: '',
    dateOfJoining: ''
  });


  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (existingStaff) {
      const formattedDate = existingStaff.dateOfJoining?.split('T')[0] || '';
      setStaff(prev => ({
        ...prev,
        ...existingStaff,
        dateOfJoining: formattedDate
      }));
      if (existingStaff.image) {
        setImagePreview(existingStaff.image);
      }
    } else {
      setStaff({
        teacherName: '',
        gender: '',
        email: '',
        phoneNumber: '',
        address: '',
        image: null,
        aadharNumber: '',
        designation: '',
        exprerence: '',
        dateOfJoining: ''
      });
      setImagePreview(null);
    }
  }, [existingStaff]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      const selectedFile = files[0];
      setStaff({ ...staff, [name]: selectedFile });
      
      // Create image preview
      if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setImagePreview(null);
      }
    } else {
      setStaff({ ...staff, [name]: value });
    }
  };

    const handleCancel = () => {
    navigate("/Admin"); 
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    for (const key in staff) {
      if (staff[key] !== null) {
        formData.append(key, staff[key]);
      }
    }

    try {
      const url = existingStaff 
        ? `http://localhost:4000/admin/staff/${existingStaff.staffId}`
        : 'http://localhost:4000/admin/staff';
      
      const method = existingStaff ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // refreshData();
      // onClose();
    } catch (error) {
      console.error('Error saving staff:', error);
      alert('Error saving staff. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className='newstaff-modal'>
        <div className="modal-header">
          <h2>{existingStaff ? 'Update Staff' : 'Add New Staff'}</h2>
          <button className="close-button" onClick={onClose}> {existingStaff?`x`:``} </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="input-group">
              <label>Teacher Name</label>
              <input 
                type="text" 
                name="teacherName" 
                value={staff.teacherName} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={staff.email} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input 
                type="text" 
                name="phoneNumber" 
                value={staff.phoneNumber} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group">
              <label>Gender</label>
              <select 
                name="gender" 
                value={staff.gender} 
                onChange={handleChange} 
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label>Address</label>
              <input 
                type="text" 
                name="address" 
                value={staff.address} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group">
              <label>Aadhar Card Number</label>
              <input 
                type="number" 
                name="aadharNumber" 
                value={staff.aadharNumber} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group">
              <label>Designation</label>
              <input 
                type="text" 
                name="designation" 
                value={staff.designation} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group">
              <label>Experience (years)</label>
              <input 
                type="number" 
                name="exprerence" 
                value={staff.exprerence} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group">
              <label>Date of Joining</label>
              <input 
                type="date" 
                name="dateOfJoining" 
                value={staff.dateOfJoining} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group image-upload">
              <label>Staff Photo</label>
              <input 
                type="file" 
                name="image" 
                onChange={handleChange} 
                accept="image/*" 
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              {existingStaff ? 'Update Staff' : 'Add Staff'}
            </button>
            <button type="button" className="cancel-button" onClick={existingStaff? onClose:handleCancel}  >
             Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newstaff;