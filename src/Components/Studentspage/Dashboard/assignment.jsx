import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import "../DashboardStyles/assignment.css";

Modal.setAppElement('#root'); // Accessibility requirement

const Assignment = ({ classData }) => {
    const [data, setData] = useState([]);
    const [assignments, setFilteredAssignments] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState('');

    useEffect(() => {
        fetch(`http://localhost:4000/staff/assignments`)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => console.error('Error fetching assignments:', error));
    }, []);

    useEffect(() => {
        if (data.length > 0 && classData) {
            const filtered = data.filter(item => Number(item.classNumber) === Number(classData));
            setFilteredAssignments(filtered);
        } else {
            setFilteredAssignments([]);
        }
    }, [data, classData]);

    const openModalWithDoc = (link) => {
        setSelectedLink(link);
        setModalIsOpen(true);
    };

    return (
        <div className="assignment-container">
            <h1>Assignments</h1>
            <div className="assignment-list">
                {assignments.length > 0 ? (
                    assignments.map((assignment, index) => (
                        <div key={index} className="assignment-item">
                            <h2>{assignment.subject}</h2>
                            <h3>{assignment.topic}</h3>
                            <button onClick={() => openModalWithDoc(assignment.link)} className="view-doc-button">
                                View Assignment
                            </button>
                            <p>{assignment.description}</p>
                            <p>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No assignments available for this class.</p>
                )}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Document Viewer"
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2>Assignment Document</h2>
                <iframe
                    src={selectedLink}
                    title="Document Viewer"
                    width="100%"
                    height="100%"
                    style={{ border: 'none',minHeight: '600px'  }}
                />
                <button onClick={() => setModalIsOpen(false)} className="view-doc-button" >Close</button>
            </Modal>
        </div>
    );
};

export default Assignment;
