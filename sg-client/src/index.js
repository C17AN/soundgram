import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './pages/Main';
import SignInPage from './pages/SignIn';
import SignUpPage from 'pages/Signup';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./styles/common.css"
import "./styles/default.css"
import "./styles/admin.css"
import "./styles/login.css"

ReactDOM.render(
  <div className="wrap fold_lnb">
    <Router>
      <Routes>
        <Route path="/admin" element={<MainPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </Router>
  </div>,
  document.getElementById('root')
);

