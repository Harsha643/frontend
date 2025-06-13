import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [logindata, setLoginData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetching() {
            const response = await fetch('http://localhost:4000/admin/staff');
            const data = await response.json();
            setLoginData(data);
        }
        fetching();
    }, []);

    const search = (event) => {
        event.preventDefault(); // Prevent page reload
        const formdata = new FormData(event.target); // Create FormData from the form

        const teacherName = formdata.get("teacherName");
        const password = formdata.get("StaffPassword");
        console.log(teacherName, password);

        const staff = logindata.find(
            (item) =>
                item.teacherName === teacherName && item.password === password
        );
        if (staff) {
            navigate('/dashboard', { state: { staffdata: staff } });
        } else {
            alert('Invalid credentials!');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={search}>
                <input
                    type="text"
                    name="teacherName"
                    placeholder="Enter Teacher Name"
                    required
                />
                <input
                    type="password"
                    name="StaffPassword"
                    placeholder="Enter Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;