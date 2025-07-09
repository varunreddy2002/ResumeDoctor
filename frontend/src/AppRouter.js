import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import Header from './components/Header';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';

function AppRouter() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (checking) return <div className="p-6 text-center">Loading...</div>;

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
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-sans transition-colors">

         {/* Sticky Header Wrapper */}
<div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
  <Header
    user={auth.currentUser}
    darkMode={darkMode}
    toggleDarkMode={toggleDarkMode}
  />
</div>


          {/* ✅ Routes */}
          <Routes>
            <Route path="/home" element={<Home darkMode={darkMode} />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Home darkMode={darkMode} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;