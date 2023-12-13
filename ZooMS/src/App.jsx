
import './App.css'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'

function App() {

  return (
    // <><Login /></>
    <BrowserRouter>
    <Routes> 
      <Route path = "/adminlogin" element={<Login />}></Route>
      <Route path = "/dashboard" element={<Dashboard />}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
