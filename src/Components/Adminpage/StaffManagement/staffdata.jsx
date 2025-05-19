import React, { useState, useEffect } from "react";
import Newstaff from "../Newstaft/Newstaff";
import "./staffdata.css";

const StaffDataFetching = () => {
  const [staffData, setStaffData] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4000/admin/staff");
      const data = await response.json();
      setStaffData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/admin/staff/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleUpdate = (staff) => {
    setSelectedStaff(staff);
    setIsAddingNew(false);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setSelectedStaff(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsAddingNew(false);
    setSelectedStaff(null);
  };

  const handleSave = async (staff) => {
    try {
      const formData = new FormData();
      Object.keys(staff).forEach(key => {
        if (staff[key] !== null && staff[key] !== undefined) {
          formData.append(key, staff[key]);
        }
      });

      const method = selectedStaff ? "PUT" : "POST";
      const url = selectedStaff
        ? `http://localhost:4000/admin/staff/${selectedStaff._id}`
        : "http://localhost:4000/admin/staff";

      const response = await fetch(url, {
        method,
        body: formData
      });

      if (response.ok) {
        fetchData();
        closeModal();
      } else {
        console.error("Error saving staff:", await response.text());
      }
    } catch (error) {
      console.error("Error saving staff:", error);
    }
  };

  return (
    <div className="staff-data-fetching">
      <h1>Staff Data</h1>
      <button className="add-staff-btn" onClick={handleAddNew}>Add New Staff</button>
      
      <table className="staff-table">
        <thead>
          <tr>
            <th>Staff Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff) => (
            <tr key={staff._id}>
              <td>{staff.teacherName}</td>
              <td>{staff.email}</td>
              <td>{staff.gender}</td>
              <td>{staff.phoneNumber}</td>
              <td>{staff.address}</td>
              <td>{staff.designation}</td>
              <td className="action-buttons">
                <button className="update-btn" onClick={() => handleUpdate(staff)}>Update</button>
                <button className="delete-btn" onClick={() => handleDelete(staff._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Newstaff
          staff={selectedStaff}
          onSave={handleSave}
          onCancel={closeModal}
          isAddingNew={isAddingNew}
        />
      )}
    </div>
  );
};

export default StaffDataFetching;