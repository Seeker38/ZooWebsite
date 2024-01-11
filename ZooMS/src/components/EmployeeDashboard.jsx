import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams,Link } from 'react-router-dom';
import './EmployeeDashboard.css';



const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState([])
  const [assignWork, setAssignWork] = useState([])
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
  const fetchEmployeeData = async () => {
    try {
      // Fetch data for the authenticated user
      const response = await axios.get('http://localhost:3000/employee/employee_record/' + id);
      setEmployee(response.data[0]);
      
      // Fetch assigned work data
      const assignWorkResponse = await axios.get('http://localhost:3000/employee/assign_work/' + id);
      setAssignWork(assignWorkResponse.data[0]);
    } catch (error) {
      // Handle errors, e.g., redirect to login page
      navigate('/employee_login');
    }
  };

  fetchEmployeeData();
}, [id, navigate]);
  const handleLogout = () => {
      axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if(result.data.Status) {
          localStorage.removeItem("valid")
          navigate('/entrance')
        }
      }).catch(err => console.log(err))
    };

  const handleJob = (departmentId) => {
    // Add logic to change the URL path based on the departmentId
    let newPath = '';

    // You can customize the URL path based on the departmentId
    if (departmentId === 6) {
      newPath = '/department';
    } else {
      // Handle other departments if needed
      newPath = '/edit/default_path';
    }

    // Navigate to the new path
    navigate(newPath);
  };

  const renderEditButton = () => {
    if (employee.id_department === 6) {
      return (
        <button className='btn btn-primary me-2' onClick={() => handleJob(employee.id_department)}>
          Job
        </button>
      );
    }
    return null;
  };    

return (
  <div>
      <div className="p-2 d-flex justify-content-center shadow">
          <h4>Emoployee Management System</h4>
      </div>
      <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
          {/* <img src={`http://localhost:3000/Images/`+employee.image} className='emp_det_image'/> */}
          <div className='d-flex align-items-center flex-column mt-5'>
              <h3>Name: {employee.first_name} {employee.last_name}</h3>
              <h3>Gender: {employee.sex} </h3>
              <h3>Phone: {employee.phone_number} </h3>
              <h3>Email: {employee.email}</h3>
              <h3>Salary: ${employee.salary}</h3>
          </div>
          <div>
              {renderEditButton()}
              <Link to={`/edit_employee/`+employee.id} className="btn btn-primary me-2">
                        Edit
                      </Link>
              <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </div>
          <div>
              <h3> Work : {assignWork.work}</h3>
          </div>
      </div>
  </div>
)
}
export default EmployeeDashboard
