import React, { useState, useEffect } from 'react';
import "../DashboardStyles/notes.css"
const Notes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // Fetch notes data from the server
        fetch('http://localhost:4000/staff/notes')
            .then(response => response.json())
            .then(data => setNotes(data))
            .catch(error => console.error('Error fetching notes:', error));
    }, []);
    // Render the notes list
    return (
        <div className="notes-container">
            <h1>Notes</h1>
            <ul className="notes-list">
                {notes.map((note, index) => (
                    <li key={index} className="note-item">
                        <h2>subject:{note.subject}</h2>
                        <h2>{note.title}</h2>
                        
                        {note.link && (
                            <a href={note.link} target="_blank" rel="noopener noreferrer">
                                Download File
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Notes;