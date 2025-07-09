import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ResumeUpload from './components/ResumeUpload';
import Jobs from './components/Jobs';
import StepsIndicator from './components/StepsIndicator';
import FeatureCards from './components/FeatureCards';
import Header from './components/Header'; // ✅ if used in layout

function App() {
  return (
    <div>
      {/* If you want a consistent header, leave it here */}
      {/* <Header /> */}

      <Routes>
        <Route path="/" element={<FeatureCards />} />
        <Route path="/upload" element={<ResumeUpload />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/steps" element={<StepsIndicator />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;