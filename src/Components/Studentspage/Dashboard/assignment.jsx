import React, { useState, useEffect } from 'react';
import "../DashboardStyles/assignment.css";

const Assignment = ({ classData }) => {
    const [data, setData] = useState([]);
    const [assignments, setFilteredAssignments] = useState([]);

    useEffect(() => {
        // Fetch assignment data from the server
        fetch(`http://localhost:4000/staff/assignments`)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:", data);
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

    return (
        <div className="assignment-container">
            <h1>Assignments</h1>
            <div className="assignment-list">
                {assignments.length > 0 ? (
                    assignments.map((assignment, index) => (
                        <div key={index} className="assignment-item">
                            <h2>{assignment.title}</h2>
                            <p>{assignment.description}</p>
                            <p>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No assignments available for this class.</p>
                )}
            </div>
        </div>
    );
};

export default Assignment;
