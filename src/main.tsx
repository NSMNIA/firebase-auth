import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Auth/Register';
import Reset from './pages/Auth/Reset';

ReactDOM.render(
    <Router>
      <Link to='/'>Login</Link>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/reset" element={<Reset/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>,
  document.getElementById('root')
)
