import React from 'react';
import ReactDOM from 'react-dom';
import MainPage from './pages/Main';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import NotFoundPage from 'pages/404';
import RealtimeAnalysisPage from 'pages/RealtimeAnalysis';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./styles/bootstrap.css"
import "./styles/default.css"

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/admin" element={<MainPage />} />
      <Route path="/signIn" element={<SignInPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/realtime/*" element={<RealtimeAnalysisPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

