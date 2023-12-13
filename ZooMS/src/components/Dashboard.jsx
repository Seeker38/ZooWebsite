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
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                  Zoolander
                </span>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li className="w-100">
                <Link to = "/dashboard" className="nav-link px-0 align-middle text-white"> Dashboard</Link>
              </li>
              <li>
                <Link to = "/dashboard"> Manage employee</Link>
              </li>
              <li>
                <Link to = "/dashboard"> Category</Link>
              </li>
              <li>
                <Link to = "/dashboard"> Profile</Link>
              </li>
              <li>
                <Link to = "/dashboard"> SignOut</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard