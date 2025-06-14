import React from 'react';
// import "../DashboardStyles/Header.css";

const Header = ({ staffdata }) => {
    return (
        <div className='header-container'>
            <img 
                src={staffdata?.image}
                alt={`${staffdata?.teacherName || 'teacher'} profile`}
                width="50px"
                style={{ 
                    borderRadius: "50%",
                    border: "2px solid #fff",
                    boxSizing: "border-box",
                    backgroundColor: "#fff"
                }}
                onError={(e) => {
                    e.target.src = '/profile.png';
                    e.target.alt = ' profile';
                }}
            />
            <h2>{staffdata?.teacherName}</h2>
            <h2>{staffdata?.staffId}</h2>
                
        </div>
    );
};

export default Header;