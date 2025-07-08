// src/Home.js
import React, { useState } from 'react';
import Header from './Header';
import StepsIndicator from './StepsIndicator';
import FeatureCards from './FeatureCards';
import JobInputForm from './JobInputForm';
import ResumeUpload from './ResumeUpload';
import Jobs from './Jobs';
import { Routes, Route, Link } from 'react-router-dom';
import { auth } from '../firebase'; // so you can access auth.currentUser

function Home() {
  const [darkMode, setDarkMode] = useState(true);
const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-sans transition-colors">
        
<Header user={auth.currentUser} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <Routes>
          <Route
            path="/"
            element={
              <div className="p-6 max-w-3xl mx-auto">
                <StepsIndicator />
                <h2 className="text-2xl font-semibold mt-2 mb-4">Analyze Your Resume with AI</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Get instant feedback on your resume and discover how to make it stand out to employers.
                </p>
                <FeatureCards />
                <ResumeUpload />
                <JobInputForm />
                <div className="mt-6 text-center">
                  <button className="text-blue-600 dark:text-blue-400 underline">
                    Skip for now – Analyze resume without job description
                  </button>
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
