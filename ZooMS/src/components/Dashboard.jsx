import React from 'react'
import {Link} from "react-router-dom"
import "bootstrap-icons/font/bootstrap-icons.css"

function DashBoard() {
  return (
    <div className="container-fluid">
      <div className='row flex-nowrap'>
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
            <Link to= "/dashboard" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
              <span className="fs-5 fw-bolder d-none d-sm-inline ">
                  Zoolander
                </span>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="w-100">
                <Link to = "/dashboard" className="nav-link px-0 align-middle text-white"> 
                  <i className="fs-4 bi bi-menu-button-wide ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to = "/dashboard" className="nav-link px-0 align-middle text-white"> 
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Manage Employee</span>
                </Link>
              </li >
              <li className="w-100">
                <Link to = "/dashboard" className="nav-link px-0 align-middle text-white"> 
                  <i className="fs-4 bi bi-tags ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to = "/dashboard" className="nav-link px-0 align-middle text-white"> 
                  <i className="fs-4 bi bi-person-square ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100">
                <Link to = "/dashboard" className="nav-link px-0 align-middle text-white"> 
                  <i className="fs-4 bi bi-door-open ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard