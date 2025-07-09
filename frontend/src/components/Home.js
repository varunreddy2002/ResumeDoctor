import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import { auth } from '../firebase';
import FeatureCards from './FeatureCards';
import ResumeUpload from './ResumeUpload';
import JobInputForm from './JobInputForm';
import Jobs from './Jobs';

function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-sans transition-colors">
        {/* ✅ Global Header (present on all routes) */}
        <Header
          user={auth.currentUser}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        {/* ✅ Route Handling */}
        <Routes>
          <Route
            path="*"
            element={
              <div className="p-6 max-w-7xl mx-auto space-y-6">
                {/* Intro Text + Feature Cards */}
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Analyze Your Resume with AI
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Get instant feedback on your resume and discover how to make it stand out to employers.
                  </p>
                  <FeatureCards />
                </div>

               {/* Grid Form Layout: Left = JobInput, Right = ResumeUpload */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="bg-white dark:bg-gray-800 p-6 rounded border border-gray-200 dark:border-gray-700 h-full">
    <JobInputForm />
  </div>
  <div className="bg-white dark:bg-gray-800 p-6 rounded border border-dashed border-blue-300 h-full">
    <ResumeUpload />
      
  </div>
  
</div>
 
              </div>
            }
          />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
