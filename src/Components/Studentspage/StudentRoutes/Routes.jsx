import {  Routes, Route } from "react-router-dom";
import Login from "../Dashboard/login"
import Dashboard from "../Dashboard/Dashboard";


function LoginRoute(){
    return (

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>

    );
}

export default LoginRoute;