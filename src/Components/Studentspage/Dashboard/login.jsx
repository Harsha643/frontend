import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Dashboard from "./Dashboard";


const Login = () => {
    const [logindata, setLoginData] = useState([]);
    const navigate = useNavigate();

    const search = (formdata) => {
        const rollnumber = formdata.get("rollnumber");
        const password = formdata.get("StudentPassword");
        
        console.log(rollnumber, password);
        
        const student = logindata.find(
            (element) => 
                element.rollNumber == rollnumber && 
                element.Studentpassword == password
        );

        if (student) {
            navigate("/Dashboard", { state: { studentdata: student } });
          
        } else {
            alert("Invalid credentials!");
        }
    };

    useEffect(() => {
        async function fetching() {
            const response = await fetch("http://localhost:4000/admin/students");
            const data = await response.json();
            setLoginData(data);
        }
        fetching();
    }, []);

    return (
        <div className="login-container">
            <form action={search}>
                <input 
                    type="text" 
                    name="rollnumber" 
                    placeholder="Enter Rollnumber" 
                    required 
                />
                <input 
                    type="password" 
                    name="StudentPassword" 
                    placeholder="Enter Password" 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;