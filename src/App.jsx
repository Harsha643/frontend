
import RoutesComponent from './Components/Adminpage/Routes/Routes';

import LoginRoute from './Components/Studentspage/StudentRoutes/Routes';

import StaffLoginRoute from './Components/StaftPage/StaffRoutes/LOginRoute';
function App() {
  

  return (
    <>
  <RoutesComponent />
   <LoginRoute />{ /* //studentDashboard */}
    <StaffLoginRoute />
  {/* <App */}
  {/* <Login /> */}

      {/* <Landing />
      <Home />
      <Features />
      <SmartCourses />
      <ContactUs /> */
      /* <Main1 /> */}
       
    </>
  )
}

export default App
