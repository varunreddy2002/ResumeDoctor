import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import { auth } from '../firebase';
import FeatureCards from './FeatureCards';
import ResumeUpload from './ResumeUpload';
import JobInputForm from './JobInputForm';
import Jobs from './Jobs';
import Dashboard from './Dashboard'; // 🆕 Make sure this component exists

function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      alert('Please upload a resume and enter a job description.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jd', jobDescription);

    try {
      setLoading(true);
      const res = await axios.post('http://127.0.0.1:5000/analyze_resume_gemini', formData);
      navigate('/dashboard', { state: { analysis: res.data.analysis } });
    } catch (err) {
      alert('Failed to analyze resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-sans transition-colors">
        {/* ✅ Global Header (present on all routes) */}
        {/* <Header
          user={auth.currentUser}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        /> */}

        {/* ✅ Route Handling */}
        <Routes>
          <Route
            path="/"
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
                    <JobInputForm jobDescription={jobDescription} setJobDescription={setJobDescription} />
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded border border-dashed border-blue-300 h-full">
                    <ResumeUpload resumeFile={resumeFile} setResumeFile={setResumeFile} />
                  </div>
                </div>

                {/* Analyze Button */}
                <div className="text-center">
                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="mt-6 px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Analyzing...' : 'Analyze with AI'}
                  </button>
                </div>
              </div>
            }
          />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
