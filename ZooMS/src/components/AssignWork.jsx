import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Employee.css'

function AssignWork() {
    const [work, setWork] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [site, setSite] = useState([]);

    const navigate = useNavigate()
  
    useEffect(() => {
      axios.get("http://localhost:3000/auth/assign_work")
        .then((result) => {
          if (result.data.Status) {
            setWork(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));
    
        axios.get("http://localhost:3000/auth/employee")
        .then((result) => {
          if (result.data.Status) {
            setEmployee(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));

        axios.get("http://localhost:3000/auth/site")
        .then((result) => {
          if (result.data.Status) {
            setSite(result.data.Result);
          } else {
            alert(result.data.Error);
          }
        }).catch((err) => console.log(err));
        
    }, []);
  
    const findEmployeeName = (employeeId) => {
        const foundEmployee = employee.find((emp) => emp.id === employeeId);
        return foundEmployee ? `${foundEmployee.first_name} ${foundEmployee.last_name}` : "";
      };

    const findSite = (siteId) => {
        const foundSite = site.find((site) => site.id === siteId);
        return foundSite ? `${foundSite.location}-${foundSite.used_for}` : "";
      };
      

    const handleDelete = (id) => {
      axios.delete('http://localhost:3000/auth/delete_assign_work/'+id)
      .then(result => {
          if(result.data.Status) {
              window.location.reload()
          } else {
              alert(result.data.Error)
          }
      })
    } 
    return (
        <div className="px-5 mt-3">
          <div className="d-flex justify-content-center">
            <h3>Employee List</h3>
          </div>
          <Link to="/dashboard/add_assign_work" className="btn btn-primary">
            Assign Work
          </Link>
          <div className="mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Site-Usage</th>
                  <th>Work</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {work.map((e) => (
                  <tr>
                    <td>{e.id}</td>
                    <td>{findEmployeeName(e.id)}</td>
                    <td>{findSite(e.id_site)}</td>
                    <td>{e.work}</td>
                    <td>
                      <Link to={`/dashboard/edit_assign_work/`+e.id} className="btn btn-primary btn-sm me-2">
                        Edit
                      </Link>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    );
  };

export default AssignWork