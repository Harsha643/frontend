import React, { useState, useEffect } from 'react';
import "../DashboardStyles/notes.css";

const Notes = ({ classData }) => {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);

    useEffect(() => {
        // Fetch notes data from the server
        fetch('http://localhost:4000/staff/notes')
            .then(response => response.json())
            .then(data => setNotes(data))
            .catch(error => console.error('Error fetching notes:', error));
    }, []);
    console.log("classes",classData)

    useEffect(() => {
        if (notes.length > 0 && classData) {

            const classNotes = notes.filter(note => Number(note.classNumber) === Number(classData));
            setFilteredNotes(classNotes);
        } else {
            setFilteredNotes([]);
        }
    }, [notes, classData]);
    console.log("notes",notes)
    console.log(filteredNotes)


    return (
        <div className="notes-container">
            <h1>Notes</h1>
            <ul className="notes-list">
                {filteredNotes.length > 0 ? (
                    filteredNotes.map((note, index) => (
                        <li key={index} className="note-item">
                            <h2>Subject: {note.subject}</h2>
                            <h3>{note.title}</h3>
                            {note.link && (
                                <a href={note.link} target="_blank" rel="noopener noreferrer">
                                    View Note
                                </a>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No notes available for this class.</p>
                )}
            </ul>
        </div>
    );
};

export default Notes;
