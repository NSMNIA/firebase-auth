import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from "react-router-dom";
import routes from './config/Routes';

ReactDOM.render(
  <Router>
    <Routes>
      {routes.map((route, index) =>
        <Route key={index}
          path={route.path}
          element={<route.element />}
        />
      )}
    </Routes>
  </Router>,
  document.getElementById('root')
)
