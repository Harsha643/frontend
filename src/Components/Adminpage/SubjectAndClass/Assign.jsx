import React, { useState, useEffect } from "react";
import "./Assign.css";

const Assign = () => {
  const [className, setClassName] = useState("Class 8");
  const [day, setDay] = useState("Monday");
  const [schedule, setSchedule] = useState([]);
  const [newEntry, setNewEntry] = useState({ subject: "", time: "", teacher: "" });
  const [staff, setStaff] = useState([]);

  // Fetch timetable and staff on mount or change
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await fetch(`http://localhost:4000/admin/timetable/${className}/${day}`);
        if (!response.ok) throw new Error("Not found");
        const data = await response.json();
        setSchedule(data.schedule || []);
      } catch (err) {
        console.error("Error fetching timetable:", err);
        setSchedule([]);
      }
    };



    const fetchStaff = async () => {
      try {
        const res = await fetch("http://localhost:4000/admin/staff");
        const data = await res.json();
        setStaff(data);
      } catch (err) {
        console.error("Error fetching staff:", err);
      }
    };

    fetchTimetable();
    fetchStaff();
  }, [className, day]);

  // Input handlers
  const handleEntryChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();
    const updatedSchedule = [newEntry];

    const payload = {
      className,
      day,
      schedule: updatedSchedule,
    };

    try {
      const response = await fetch("http://localhost:4000/admin/timetable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to save");

      setSchedule(updatedSchedule);
      setNewEntry({ subject: "", time: "", teacher: "" });
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  const handleDelete = (index) => {
    const updatedSchedule = schedule.filter((_, i) => i !== index);
    setSchedule(updatedSchedule);
    // Optional: update backend here
  };





  return (
    <div className="assign-container">
      <h2>Timetable Manager</h2>

      <div className="select-group">
        <select value={className} onChange={(e) => setClassName(e.target.value)}>
          <option>Class 1</option>
          <option>Class 2</option>
          <option>Class 3</option>
          <option>Class 4</option>
          <option>Class 5</option>
          <option>Class 6</option>
          <option>Class 7</option>
          <option>Class 8</option>
          <option>Class 9</option>
          <option>Class 10</option>
        </select>

        <select value={day} onChange={(e) => setDay(e.target.value)}>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
        </select>
      </div>

      <form onSubmit={handleAddEntry} className="form-group">
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={newEntry.subject}
          onChange={handleEntryChange}
          required
        />
        <input
          type="text"
          name="time"
          placeholder="Time (e.g., 9:00 - 9:45)"
          value={newEntry.time}
          onChange={handleEntryChange}
          required
        />
        <select
          name="teacher"
          value={newEntry.teacher}
          onChange={handleEntryChange}
          required
        >
          <option value="">Select Teacher</option>
          {staff.map((teacher) => (
            <option key={teacher._id} value={teacher.teacherName}>
              {teacher.teacherName}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>

      <ul className="schedule-list">
        {schedule.length === 0 ? (
          <p>No schedule for {day}</p>
        ) : (
          schedule.map((item, index) => (
            <li key={index}>
              <span>
                {item.time} - {item.subject} ({item.teacher})
              </span>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Assign;
