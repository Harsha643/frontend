import React, { useEffect, useState } from "react";
import "../DashboardStyles/Classes.css";

const Classes = ({ classData }) => {
  const [classes, setClasses] = useState([]);
  const [filteredClass, setFilteredClass] = useState([]);

  useEffect(() => {
    async function getClasses() {
      const response = await fetch("http://localhost:4000/staff/class");
      const data = await response.json();
      console.log("Fetched data:", data);
      setClasses(data);
    }

    getClasses();
    console.log("Received classData prop:", classData);
  }, []);

  useEffect(() => {
    const filteringData = classes.filter((item) => item.class === classData);
    setFilteredClass(filteringData);
  }, [classes, classData]);

  const handleClick = () => {
    // Your logic here
  };

  return (
    <div className="classes-container">
      <h1>Classes</h1>
      <div className="class-list">
        {filteredClass.map((item, index) => {
          const onlyDate = new Date(item.date).toISOString().split("T")[0];
          return (
            <div key={index} className="inside-list">
              <h2>Topic: {item.topic}</h2>
              <h2>Subject: {item.subject}</h2>
              <h2>Date: {onlyDate}</h2>
              <button onClick={handleClick}>Notes</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Classes;
