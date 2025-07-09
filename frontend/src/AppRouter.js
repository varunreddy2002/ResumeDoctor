// src/AppRouter.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

// ✅ Components - fixed paths based on your file structure
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Jobs from './components/Jobs';
import ResumeUpload from './components/ResumeUpload';

const AppRouter = () => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (checking) return <div className="p-4">Loading...</div>;

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
     
      {/* ✅ Authenticated Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/jobs" />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/upload" element={<ResumeUpload />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/jobs" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
