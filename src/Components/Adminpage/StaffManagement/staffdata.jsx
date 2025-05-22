
import React, { useState, useEffect } from "react";
import "./staffdata.css";
import Newstaff from "../Newstaft/Newstaff";

const StaffDataFetching = () => {
  const [staffData, setStaffData] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    
    try {
      const response = await fetch('http://localhost:4000/admin/staff');
      const data = await response.json();
      setStaffData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/admin/staff/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleUpdate = (staff) => {
    setSelectedStaff(staff);
    setShowModal(true);
  };

  const handleAddNewStaff = () => {
    setSelectedStaff(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedStaff(null);
    setShowModal(false);
    fetchData();
  };

  return (
    <div className="staffdata">
      <h1>Staff Data</h1>
      <button onClick={handleAddNewStaff}>Add New Staff</button>
    
      {showModal && (
        <Newstaff 
          existingStaff={selectedStaff} 
          onClose={closeModal} 
          refreshData={fetchData} 
        />
      )}
      
      <table border={"1px solid black"} cellPadding={"10px"} cellSpacing={"0px"}>
        

          <thead>
          <tr>
            <th>StaffId no </th>
            <th>Teacher Name</th>
            <th>email</th>
            <th>Address </th>
            <th>Image</th>
            <th>gender</th>
            <th>Aadhar Number</th>
            <th>Phone Number</th>
            <th>Designation</th>
            <th>exprerence</th>
            <th>dateOfJoining</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffData.map((staff) => (
            <tr key={staff.staffId}>
              <td>{staff.staffId}</td>
              <td>{staff.teacherName}</td>
              <td>{staff.email}</td>
              <td>{staff.address}</td>
              <td><img src={staff.image} alt="Staff" width={"100px"}/></td>
              <td>{staff.gender}</td>
              <td>{staff.aadharNumber}</td>
              <td>{staff.phoneNumber}</td>
              <td>{staff.designation}</td>
              <td>{staff.exprerence}</td>
              <td>{staff.dateOfJoining}</td>
              <td>
                <button onClick={() => handleUpdate(staff)}>Update</button>
                <button onClick={() => handleDelete(staff.staffId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffDataFetching;