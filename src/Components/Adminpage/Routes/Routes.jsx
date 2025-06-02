
import {Routes,Route} from "react-router-dom" 
import Main1 from "../Mainpage/main1"
import Newstudent from "../Newstudent/Newstudent"
import Newstaff from "../Newstaft/Newstaff"
import Events from "../SchoolEvents/Events"
import Assign from "../SubjectAndClass/Assign"
import Gallery from "../Gallery/Gallery"
import StudentDataFetching from "../StudentManagement/StudentdataFetching"
import StaffDataFetching from "../StaffManagement/staffdata"
import Timetable from "../Time-Table/Timetable"
import FeeManagement from "../FeeManagement/FeeManagement"
import ClassManagement from "../ClassManagement/ClassManagement"
const RoutesComponent = () => {
    return(
        <Routes>
            <Route path="/" element={<Main1 />} />
            <Route path="/Newstudent" element={<Newstudent />} />
            <Route path="/Studentsdata" element={<StudentDataFetching />} />
            <Route path="/Staffdata" element={<StaffDataFetching />} />
            <Route path="/ClassManagement" element={<ClassManagement />} />
            <Route path="/Timetable" element={<Timetable />} />
            <Route path="/feemanagement" element={<FeeManagement />} />
            <Route path="/Newstaff" element={<Newstaff />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/Assign" element={<Assign />} />
            <Route path="/Gallery" element={<Gallery />} />
        </Routes>
    )
}
export default RoutesComponent;