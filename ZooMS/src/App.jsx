
import './App.css'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Employee from './components/Employee'
import Department from './components/Department'
import Profile from './components/Profile'
import AddDepartment from './components/AddDepartment'
import AddEmployee from './components/AddEmployee'
import EditEmployee from './components/EditEmployee'
import Entrance from './components/Entrance'
import EmployeeLogin from './components/EmployeeLogin'
import EmployeeDashboard from './components/EmployeeDashboard'
import PrivateRoute from './components/PrivateRoute'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/entrance' element={<Entrance />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>
      <Route path='/employee_dashboard/:id' element={<EmployeeDashboard />}></Route>
      <Route path='/dashboard' element={
        <PrivateRoute >
          <Dashboard />
        </PrivateRoute>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/department' element={<Department />}></Route>
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/add_department' element={<AddDepartment />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
export default App
