import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from "react-router-dom";
// import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { AuthProvider } from './context/AuthProvider';
// import Reset from './pages/Auth/Reset';
// import App from './pages/Auth/App';
// import Clients from './pages/Clients';

ReactDOM.render(
    <Router>
      <AuthProvider>

      <Routes>
        {/* <Route path="/" element={<Login/>} /> */}
        <Route path="/register" element={<Register/>} />
        {/* <Route path="/reset" element={<Reset/>} />
        <Route path='app' element={<App/>}>
        <Route path='clients' element={<Clients/>}/>
      </Route> */}
      </Routes>
      </AuthProvider>
    </Router>,
  document.getElementById('root')
)
