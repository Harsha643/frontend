import React, { useState, useEffect } from 'react';
import '../DashboardStyles/Feedback.css'; // Import the CSS file

const Feedback = ({ rollNumber }) => {
  const [feedback, setFeedback] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/staff/feedback")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFeedback(data);
      })
      .catch(error => console.error("Error fetching feedback:", error.message));
  }, []);

  useEffect(() => {
    if (feedback.length > 0 && rollNumber) {
      const filteredData = feedback.filter(item => item.rollNumber === rollNumber);
      setFilteredFeedback(filteredData);
    } else {
      setFilteredFeedback([]);
    }
  }, [feedback, rollNumber]);

  return (
    <div className='feedback-container'>
      <h1>Feedback</h1>
      <div className='feedback-table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedback.length > 0 ? (
              filteredFeedback.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  
                  <td>{item.feedback}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No feedback available for this student.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feedback;
