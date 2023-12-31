import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Employee.css'

function Infrastructure() {
    const [infrastructure, setInfrastructure] = useState([]);
    const [site, setSite] = useState([]);
    const navigate = useNavigate()
  
    useEffect(() => {
      axios.get("http://localhost:3000/auth/infrastructure")
        .then((result) => {
          if (result.data.Status) {
            setInfrastructure(result.data.Result);
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
  
    const findSite = (siteId) => {
        const foundSite = site.find((site) => site.id === siteId);
        return foundSite ? `${foundSite.location}` : "";
    };
  
    const handleDelete = (id) => {
      axios.delete('http://localhost:3000/auth/delete_infrastructure/'+id)
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
          <h3>Infrastructure List</h3>
        </div>
        <Link to="/dashboard/add_infrastructure" className="btn btn-primary">
          Add Infrastructure
        </Link>
        <div className="mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {infrastructure.map((e) => (
                <tr>
                  <td>{e.name}</td>
                  <td>{findSite(e.id_site)}</td>
                  <td>{e.status}</td>
                  <td>
                    <Link to={`/dashboard/edit_infrastructure/`+e.id} className="btn btn-primary btn-sm me-2">
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

export default Infrastructure