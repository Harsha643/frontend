

import Main1 from "./Components/Adminpage/Mainpage/main1"
import {Routes,Route} from "react-router-dom" 
import Newstudent from "./Components/Adminpage/Newstudent/Newstudent"
import Newstaff from "./Components/Adminpage/Newstaft/Newstaff"
import Events from "./Components/Adminpage/SchoolEvents/Events"
import Assign from "./Components/Adminpage/SubjectAndClass/Assign"
import Gallery from "./Components/Adminpage/Gallery/Gallery"
import StudentDataFetching from "./Components/Adminpage/StudentManagement/StudentdataFetching"
import StaffDataFetching from "./Components/Adminpage/StaffManagement/staffdata"
import Admin from "./Components/Adminpage/Adminlanding/Admin"
import Timetable from "./Components/Adminpage/Time-Table/Timetable"
import FeeManagement from "./Components/Adminpage/FeeManagement/FeeManagement"
import ClassManagement from "./Components/Adminpage/ClassManagement/ClassManagement"
function App() {
  

  return (
    <>
     <Routes>
      <Route path="/" element={<Main1 />}/>
      <Route path="/Admin" element={<Admin/>} />
      <Route path="/Newstudent" element={<Newstudent />} />
      <Route path="/Studentsdata" element={<StudentDataFetching/>} />
      <Route path="/Staffdata" element={<StaffDataFetching />} />
      <Route path="/ClassManagement" element={<ClassManagement />} />
      <Route path="/Timetable" element={<Timetable />} />
      <Route path="/feemanagement" element={<FeeManagement />} />
      <Route path="/Newstaff" element={<Newstaff />} />
      <Route path="/Events" element={<Events />} />
      <Route path="/Assign" element={<Assign />} />
      <Route path="/Gallrey" element={<Gallery />} />
     </Routes>
     


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
