import React, { useState, useEffect } from 'react';
import '../DashboardStyles/Classes.css';

const Classes = () => {
    const [classes, setClasses] = useState([]);
// const [classValue, setClassValue] = useState(class6 || class7 || class8 || class9 || class10 );
    const [showModal, setShowModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [formData, setFormData] = useState({
        class: '',
        subject: '',
        topic: '',
        date: ''
    });

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const response = await fetch('http://localhost:4000/staff/class');
            const data = await response.json();
            setClasses(data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        }
    };

    const handleEdit = (classItem) => {
        setSelectedClass(classItem);
        setFormData({
            class: classItem.class,
            subject: classItem.subject,
            topic: classItem.topic,
            date: new Date(classItem.date).toISOString().split('T')[0],
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:4000/staff/class/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setClasses(prev => prev.filter(item => item._id !== id));
                alert("Deleted successfully");
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await fetch(`http://localhost:4000/staff/class/${selectedClass._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                fetchClasses();
                setShowModal(false);
                alert("Updated successfully");
            } else {
                alert("Failed to update");
            }
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            <table className="classes-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Class</th>
                        <th>Subject</th>
                        <th>Topic</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((classItem, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{classItem.class}</td>
                            <td>{classItem.subject}</td>
                            <td>{classItem.topic}</td>
                            <td>{new Date(classItem.date).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleEdit(classItem)}>Edit</button>
                                <button onClick={() => handleDelete(classItem._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Edit Class</h2>
                        <label>Class:</label>
                        <input type="text" name="class" value={formData.class} onChange={handleChange} />
                        <label>Subject:</label>
                        <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
                        <label>Topic:</label>
                        <input type="text" name="topic" value={formData.topic} onChange={handleChange} />
                        <label>Date:</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} />

                        <div className="modal-actions">
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Classes;
