import React, { useState } from 'react';
import Header from './components/Header';
import StepsIndicator from './components/StepsIndicator';
import FeatureCards from './components/FeatureCards';
import JobInputForm from './components/JobInputForm';
import ResumeUpload from './components/ResumeUpload';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-sans transition-colors">
        <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

        <div className="p-6 max-w-3xl mx-auto">
          <StepsIndicator />
          <h2 className="text-2xl font-semibold mt-2 mb-4">Analyze Your Resume with AI</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Get instant feedback on your resume and discover how to make it stand out to employers.
          </p>

          <FeatureCards />
          <div className="p-6 max-w-3xl mx-auto">
  <ResumeUpload />
</div>

          <JobInputForm />

          <div className="mt-6 text-center">
            <button className="text-blue-600 dark:text-blue-400 underline">
              Skip for now – Analyze resume without job description
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
