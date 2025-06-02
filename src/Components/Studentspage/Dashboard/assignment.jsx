import React, { useState, useEffect } from 'react';
import "../DashboardStyles/assignment.css"
const Assignment = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch assignment data from the server
        fetch('http://localhost:4000/staff/assignments')
            .then(response => response.json())
            .then(data => console.log(data) || setData(data))
            .catch(error => console.error('Error fetching assignments:', error));
    }, []);
    console.log("Assignment data:", data);

    return(
        
        <div className="assignment-container">
            <h1>Assignments</h1>
            <div className="assignment-list">
                {data.map((assignment, index) => (
                    <div key={index} className="assignment-item">
                        <h2>{assignment.title}</h2>
                        <p>{assignment.description}</p>
                        <p>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Assignment;