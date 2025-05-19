import React, { useState, useEffect } from "react";
import "./Newstaff.css";

const Newstaff = ({ staff, onSave, onCancel, isAddingNew }) => {
  const [formData, setFormData] = useState({
    teacherName: "",
    email: "",
    gender: "",
    phoneNumber: "",
    address: "",
    designation: "",
    aadharNumber: "",
    experience: "",
    joinedDate: "",
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (staff) {
      setFormData(staff);
      if (staff.image) {
        setPreviewImage(
          staff.image instanceof File
            ? URL.createObjectURL(staff.image)
            : `http://localhost:4000/uploads/${staff.image}`
        );
      }
    } else {
      setFormData({
        teacherName: "",
        email: "",
        gender: "",
        phoneNumber: "",
        address: "",
        designation: "",
        aadharNumber: "",
        experience: "",
        joinedDate: "",
        image: null
      });
      setPreviewImage(null);
    }
  }, [staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="staff-form">
        <h3>{isAddingNew ? "Add New Staff" : "Update Staff"}</h3>

        <div className="form-row">
          <div className="form-group">
            <label>Staff Name</label>
            <input
              type="text"
              name="teacherName"
              value={formData.teacherName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Aadhar Number</label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              required
              pattern="[0-9]{12}"
            />
          </div>
          <div className="form-group">
            <label>Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Experience (years)</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Joined Date</label>
            <input
              type="date"
              name="joinedDate"
              value={formData.joinedDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Staff Photo</label>
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Staff Preview" />
            </div>
          )}
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <div className="form-buttons">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit">
            {isAddingNew ? "Add Staff" : "Update Staff"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Newstaff;