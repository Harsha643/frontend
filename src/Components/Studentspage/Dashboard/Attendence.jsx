import React, { useState, useEffect } from "react";

const Attendance = ({ rollNumber }) => {
    const [attendance, setAttendance] = useState([]);
    const [filteredAttendance, setFilteredAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all attendance records
    const getAttendance = async () => {
        try {
            setLoading(true);
            setError(null); // Clear any previous error

            const response = await fetch('http://localhost:4000/admin/attendance/student');

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            setAttendance(data);
        } catch (err) {
            console.error("Error fetching attendance:", err);
            setError("Failed to load attendance. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAttendance();
    }, []);

  useEffect(() => {
    if (attendance.length > 0 && rollNumber) {
        const filtered = attendance.filter(item => item.rollNumber === rollNumber);
        setFilteredAttendance(filtered);
    } else {
        setFilteredAttendance([]);
    }
}, [attendance, rollNumber]); 


    return (
        <div className="attendance-container">
            <h1>Attendance</h1>

            {loading && <p>Loading attendance...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && !error && (
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAttendance.length > 0 ? (
                            filteredAttendance.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{new Date(item.date).toLocaleDateString()}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No attendance records found for this student.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Attendance;
