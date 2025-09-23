import './index.css';
import HomePage from "./sections/HomePage/homePage";
import Login from './sections/login/Login.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './sections/AdminDashboard/AdminDashboard.jsx';
import StudentDashboard from './sections/StudentDashboard/StudentDashboard.jsx';
import ParentDashboard from './sections/ParentDashboard/ParentDashboard.jsx';
import NotFound from './sections/NotFound.jsx';
import AdminHome from './sections/AdminPages/AdminHome.jsx';
import Users from './sections/AdminPages/Users.jsx';
import Registration from './sections/registration/Registration.jsx';
import ManageUsers from './sections/ManageUsers/ManageUsers.jsx';


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Login' element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/parent" element={<ParentDashboard />} />

        //Outlet to display children routes in parent route
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          {/* <Route path="users" element={<Users />} /> */}
          <Route path="admin/register" element={<Registration />} />
          <Route path="admin/manageUser" element={<ManageUsers />} />
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>

  )
}

export default App
