import React, { useEffect, useState } from 'react';
import Newstudent from '../Newstudent/Newstudent';
  import './studentdata.css';

const StudentDataFetching = () => {
  const [studentData, setStudentData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/admin/students');
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/admin/students/${id}`, { 
        method: 'DELETE' 
      });
      fetchData();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setIsAddingNew(false);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setSelectedStudent(null);
    setIsAddingNew(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
    fetchData();
  };


      const classes = [
      { id: 'nursery', name: 'Nursery' },
      { id: 'pp1', name: 'PP1' },
      { id: 'pp2', name: 'PP2' },
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `${i + 1}`,
        name: `Class ${i + 1}`,
      })),
    ];


  return (
    <div className="student-data-container">
      <div className="header-section">
        <h1>Students Data</h1>
        <button className="add-new-btn" onClick={handleAddNew}>
          <img src="/add.jpg" alt="Add New" width={"20px"}/>
        </button>
      </div>
        <div className="search-container">
          <input type='text' placeholder='Search...' className='search-input'/>
          <button className='search-btn'> Search</button>

        </div>
    <div className="filter-class">
      <select className="class-select">
        <option value="">Select Class</option>
        {classes.map((cls) => (
          <option key={cls.id} value={cls.id}>
            {cls.name}
          </option>
        ))}
      </select>
    </div>

      <div className="table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>Admission No</th>
              <th>Roll No</th>
              <th>Studentprofile</th>
              <th>Student Name</th>
              <th>Age</th>
              <th>Class</th>
              <th>Father Name</th>
              <th>Date of Birth</th>
              <th>Aadhar Card Number</th>
              <th>Nationality</th>
              <th>Religion</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Mother Tongue</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
           
            {studentData.map((student) => (
              console.log(student),
              <tr key={student._id}>
                <td>{student.admissionNumber}</td>
                <td>{student.rollNumber}</td>
                <td>
  <img
    src={student.image}
    alt="Student"
    width="50"
    height="50"
    style={{ borderRadius: '50%', objectFit: 'cover' }}
  />
</td>
               
                <td>{student.studentName}</td>
                <td>{student.age}</td>
                <td>{student.presentClass}</td>
                <td>{student.fatherName}</td>
                <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                <td>{student.aadharCardNumber}</td>
                <td>{student.nationality}</td>
                <td>{student.religion}</td>
                <td>{student.gender}</td>
                <td>{student.address}</td>
                <td>{student.MotherTongue}</td>
                <td className="action-buttons">
                  <button 
                    className="update-btn" 
                    onClick={() => handleUpdate(student)}
                  >
                    <img src="/edit.png" alt="Edit" width={"20px"}/>
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(student._id)}
                  >
                   <img src="/delete.png" alt="Delete" width={"20px"}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{isAddingNew ? 'Add New Student' : 'Update Student'}</h2>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <Newstudent 
                existingStudent={selectedStudent} 
                onClose={closeModal}
                refreshData={fetchData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
 
  );
  }

export default StudentDataFetching;