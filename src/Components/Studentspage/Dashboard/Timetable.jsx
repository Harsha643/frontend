import React, { useEffect, useState } from "react";

const Timetable = ({ classData }) => {
    const [timetable, setTimetable] = useState([]);
    const [filteredSchedule, setFilteredSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTimetable() {
            try {
                const response = await fetch("http://localhost:4000/admin/timetable");
                if (!response.ok) {
                    throw new Error('Failed to fetch timetable');
                }
                const data = await response.json();
                setTimetable(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching timetable:', err);
            } finally {
                setLoading(false);
            }
        }
        
        fetchTimetable();
    }, []);

    useEffect(() => {
        if (timetable.length > 0 && classData) {
            const foundClass = timetable.find(item => 
                Number(item.className.split(" ").pop()) === classData
            );
            if (foundClass) {
                setFilteredSchedule(foundClass.schedule);
            } else {
                setFilteredSchedule([]);
            }
        }
    }, [timetable, classData]);

    if (loading) return <div className="loading">Loading timetable...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!timetable || timetable.length === 0) return <div className="no-data">No timetable data available</div>;
    if (!classData) return <div className="no-class">Please select a class to view timetable</div>;
    if (filteredSchedule.length === 0) return <div className="no-schedule">No schedule available for Class {classData}</div>;

    // Define days of the week in order
    const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const time=["9:00-9:45","9:45 - 10:30","10:30-11:15","11:15-11:30","11:30-12:15","12:15-1:00","1:00-:2:00","2:00-2:45","2:45-3:30","3:30 - 3:45","3:45  - 5:00"
]
    
   
    console.log("54",filteredSchedule)

    return (
        <div className="timetable-container">
            <h2>Class {classData} Timetable</h2>
            <div className="timetable-table">
                <table cellPadding={"0px"} border={"2"} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Day\Time</th>
                            {time.map(time=> (
                                <th key={time}>{time}</th>
                            ))}
                        </tr>
                    </thead>
                    {/* <tbody> */}
                        {/* {uniqueTimes.map(time => (
                            <tr key={time}>
                                <td className="time-cell">{time}</td>
                                {daysOrder.map(day => {
                                    const daySchedule = filteredSchedule.find(d => d.day === day);
                                    console.log("75",daySchedule)
                                    // const timeSlot = daySchedule?.timeSlots.find(slot => slot.Time === time);
                                    return (
                                        <td key={`${day}-${time}`}>
                                            {timeSlot ? (
                                                <div className="subject-cell">
                                                    <strong>{timeSlot.subject}</strong>
                                                    {timeSlot.teacher && <div className="teacher">{timeSlot.teacher}</div>}
                                                    {timeSlot.room && <div className="room">{timeSlot.room}</div>}
                                                </div>
                                            ) : '-'}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody> */}
                </table>
            </div>
        </div>
    );
};

export default Timetable;