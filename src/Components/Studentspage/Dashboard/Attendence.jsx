import React, { useState, useEffect } from "react";
import "../DashboardStyles/Attendance.css"; // Make sure this file exists

const Attendance = ({ rollNumber }) => {
    const [attendance, setAttendance] = useState([]);
    const [filteredAttendance, setFilteredAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAttendance = async () => {
        try {
            setLoading(true);
            setError(null);

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
        <div className="attendance-wrapper">
            <h1>Attendance</h1>

            {loading && <p className="loading">Loading attendance...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <div className="table-responsive">
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
                                        <td>{new Date(item.date).toISOString().split("T")[0]}</td>
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
                </div>
            )}
        </div>
    );
};

export default Attendance;
