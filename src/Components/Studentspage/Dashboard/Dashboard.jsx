import React, { useState,useEffect } from 'react';
import '../DashboardStyles/Dashboard.css';
import Home from './Home';
import Notes from './notes';
import Assignment from './assignment';
import { useLocation } from "react-router-dom";
import Header from './Header';
import Timetable from "./Timetable"
import Feedback from './feedback';
import Attendence from './Attendence';
import Classes from './classes';

const Dashboard = () => {

     const { state } = useLocation();
    const student = state?.studentdata; 
    const [studentdata,setStudentdata]=useState({})
    useEffect(() => {
    setStudentdata(student);
}, [student]);
console.log("dfgjhkj",studentdata)

    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home />;
            case 'notes':
                return <Notes studentdata={studentdata}/>;
            case 'class':
                return <Classes classData={studentdata.presentClass} />
          
            case 'assignment':
                return <Assignment  classData={studentdata.presentClass}/>;
            case 'attendance':
                return <Attendence rollNumber={studentdata.rollNumber} />;
            case 'timetable':
                return <Timetable classData={studentdata.presentClass} />;
            case 'feedback':
                return <Feedback rollNumber={studentdata.rollNumber}/>;
            default:
                return <Home />;
        }
    };

    return (
        <div className="dashboard-container">
            
            <div className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h2>Student Portal</h2>
                </div>
                <nav className="sidebar-nav">
                    <button className="nav-button" onClick={() => setCurrentPage('home')}>
                        <span className="icon"><img src='/home1.png'  width={"30px"}/></span>
                        <span>Home</span>
                    </button>
                    <button className="nav-button" onClick={() => setCurrentPage('class')}>
                        <span className="icon"><img src='/class.png'  width={"30px"}/></span>
                        <span>Classes</span>
                    </button>
                    <button className="nav-button" onClick={() => setCurrentPage('notes')}>
                        <span className="icon"><img src='/notes.png'  width={"30px"}/></span>
                        <span>Notes</span>
                    </button>
                    <button className="nav-button" onClick={() => setCurrentPage('assignment')}>
                        <span className="icon"><img src='/assignment.png'  width={"30px"}/></span>
                        <span>Assignments</span>
                    </button>
                    <button className="nav-button" onClick={() => setCurrentPage('attendance')}>
                        <span className="icon"><img src='/attendence.png'  width={"30px"}/></span>
                        <span>Attendance</span>
                    </button>
                    <button className="nav-button" onClick={() => setCurrentPage('timetable')}>
                        <span className="icon"><img src='/timetable.png'  width={"30px"}/></span>
                        <span>Time Table</span>
                    </button>
                    <button className="nav-button" onClick={() => setCurrentPage('feedback')}>
                        <span className="icon"><img src='/fb.png'  width={"30px"}/></span>
                        <span>Feedback</span>
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button className="logout-button">
                        <span className="icon">🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            <div className="dashboard-main">
                    <Header studentdata={studentdata}/>
                <div className="dashboard-content">
                    {renderPage()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
