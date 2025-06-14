import React, { useState, useEffect } from "react";
import "../DashboardStyles/Timetable.css";

const Timetable = () => {
    const [data, setData] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null); // For modal
    const [showModal, setShowModal] = useState(false);
    console.log(data, "data from timetable");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/admin/timetable');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching timetable:', error);
            }
        };
        fetchData();
    }, []);

    const openModal = (classItem) => {
        setSelectedClass(classItem);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedClass(null);
    };

    return (
        <div className="timetable-container">
            <h1>Time Table</h1>
            <table className="timetable" cellSpacing="0" cellPadding="5" border="1">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Subject and Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((classItem, classIndex) => (
                        <React.Fragment key={classIndex}>
                            <tr className="class-header" onClick={() => openModal(classItem)} style={{ cursor: "pointer" }}>
                                <td>{classItem.className}</td>
                                <td>Click to view full schedule</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

            {showModal && selectedClass && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Schedule for {selectedClass.className}</h2>
                        <div className="subject-time-grid">
                            {selectedClass.schedule.map((item, index) => (
                                <div key={index} className="subject-time-item">
                                    <div className="subject"><strong>{item.subject}</strong></div>
                                    <div className="time">{item.time}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: "15px", textAlign: "right" }}>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Timetable;
