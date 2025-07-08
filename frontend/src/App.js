import React, { useState } from 'react';
import Header from './components/Header';
import StepsIndicator from './components/StepsIndicator';
import FeatureCards from './components/FeatureCards';
import JobInputForm from './components/JobInputForm';
import ResumeUpload from './components/ResumeUpload';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Jobs from './components/Jobs'; // <-- this will be created next

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-sans transition-colors">
          {/* Header with Jobs button */}
          <header className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
           <Link to="/" className="text-xl font-bold no-underline hover:no-underline focus:no-underline">
  Resume Doctor
</Link>


            <div className="space-x-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded text-sm"
              >
                Toggle {darkMode ? 'Light' : 'Dark'}
              </button>
              <Link
                to="/jobs"
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Jobs
              </Link>
            </div>
          </header>

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
    </Router>
  );
}

export default App;
