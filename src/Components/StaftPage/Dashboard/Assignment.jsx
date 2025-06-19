import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import '../DashboardStyles/Assignment.css';

Modal.setAppElement('#root'); // This is important for accessibility

const Assignment = () => {
    const [assignments, setAssignments] = useState([]);

    const [editIndex, setEditIndex] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const location = useLocation();
    const staff = location.state?.staffdata;
    const [staffdata, setStaffdata] = useState({});
        const [form, setForm] = useState({ classNumber: '', subject: '', topic: '', link: '',teacher:'',description: ''  });

    useEffect(() => {
        setStaffdata(staff);
    }, [staff]);

    const fetchAssignment = async () => {
        try {
            const response = await fetch('http://localhost:4000/staff/assignments');
            const data = await response.json();
            setAssignments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch assignment:', error);
            setAssignments([]);
        }
    };

    useEffect(() => {
        fetchAssignment();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editIndex !== null) {
            const id = assignments[editIndex]._id;
            try {
                await fetch(`http://localhost:4000/staff/assignments/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
            } catch (err) {
                console.error('Update failed', err);
            }
        } else {
            try {
                await fetch('http://localhost:4000/staff/assignments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
                alert("Assignment added successfully");
            } catch (err) {
                console.error('Create failed', err);
            }
        }

        setModalIsOpen(false);
        setForm({ classNumber: '', subject: '', topic: '', link: '' ,teacher: staffdata?.teacherName || '', description: '' });
        setEditIndex(null);
        fetchAssignment();
    };

    const handleEdit = (index) => {
        const item = assignments[index];
        setForm({ classNumber: item.classNumber, subject: item.subject, topic: item.topic, link: item.link , teacher: item.teacher, description: item.description });
        setEditIndex(index);
        setModalIsOpen(true);
    };

    // const handleDelete = async (id) => {
    //     try {
    //         await fetch(`http://localhost:4000/staff/assignments/${id}`, {
    //             method: 'DELETE',
    //         });
    //         fetchAssignment();
    //     } catch (err) {
    //         console.error('Delete failed', err);
    //     }
    // };

    return (
        <div className="assignment-container">
            <h2>Assignments</h2>
            <button onClick={() => setModalIsOpen(true)}>+ Add Assignment</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => {
                    setModalIsOpen(false);
                    setForm({ classNumber: '', subject: '', topic: '', link: '', teacher: staffdata?.teacherName || '', description: '' });
                    setEditIndex(null);
                }}
                contentLabel="Assignment Modal"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2>{editIndex !== null ? 'Edit Assignment' : 'Add New Assignment'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        name="classNumber"
                        placeholder="Class"
                        value={form.classNumber}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="subject"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="topic"
                        placeholder="Topic"
                        value={form.topic}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="link"
                        placeholder="Assignment Link"
                        value={form.link}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        name="description"
                        value={form.description}
                        placeholder="Description"
                        onChange={handleChange}
                    />
                    <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
                    <button type="button" onClick={() => setModalIsOpen(false)}>Cancel</button>
                </form>
            </Modal>

            <table className="assignment-table" cellSpacing="0" cellPadding="5" border="1">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Class</th>
                        <th>Subject</th>
                        <th>Topic</th>
                        <th>Assignment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.classNumber}</td>
                            <td>{item.subject}</td>
                            <td>{item.topic}</td>
                            <td><a href={item.link} target="_blank" rel="noreferrer">Open</a></td>
                            <td>
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                {/* <button onClick={() => handleDelete(item._id)}>Delete</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Assignment;
