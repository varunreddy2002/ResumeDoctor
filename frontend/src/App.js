import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UploadResume from './components/UploadResume';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AnalysisPage from './pages/AnalysisPage';
import Navbar from './components/Navbar'; // Add Navbar if you want branding
import ProfilePage from './pages/ProfilePage'; // Create a dummy page



function App() {
  return (
    <Router>
      <Navbar /> {/* Optional: remove this if you don’t want it on login/signup */}
      <Routes>
        <Route path="/" element={<UploadResume />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
