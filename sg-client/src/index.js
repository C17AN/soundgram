import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MainPage from './pages/Main';
import LoginPage from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./styles/common.css"
import "./styles/global.css"
import "./styles/admin.css"

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/admin" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

