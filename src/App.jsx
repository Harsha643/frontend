
// import RoutesComponent from './Components/Adminpage/Routes/Routes';

// import LoginRoute from './Components/Studentspage/StudentRoutes/Routes';

// import StaffLoginRoute from './Components/StaftPage/StaffRoutes/LOginRoute';
import AdminLogin from './Components/AdminLogin/Admin';
import {Routes,Route} from "react-router-dom" 
import RoutesComponent from './Components/Adminpage/Routes/Routes';

function App() {
  

  return (
    
  

      <Routes>
            <Route path="/" element={<AdminLogin />} />
           
           
            <Route path="/admin/*" element={<RoutesComponent />} />
            
            
        </Routes >
        
      

      
  )
}

export default App


