import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { auth } from '../firebase'; // so you can access auth.currentUser

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");


  const fetchJobs = async () => {
    try {
      const response = await axios.get(`https://remotive.com/api/remote-jobs?search=${search}`);
      setJobs((response.data.jobs || []).slice(0, 10));
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []); // only once on load

  const handleSearch = () => {
    fetchJobs();
  };
 const [darkMode, setDarkMode] = useState(true);
const toggleDarkMode = () => setDarkMode(!darkMode);
  return (
      <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white font-sans transition-colors">
      <Header user={auth.currentUser} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

    <div className="p-6 max-w-5xl mx-auto text-white dark:text-white">
        
<h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-black dark:text-white">
  <span role="img" aria-label="search"></span> Search Jobs
</h2>

   <div className="flex items-center gap-2 mb-6">
  <span className="text-2xl text-black dark:text-white"></span>
  <input
    type="text"
    className="p-2 rounded w-full border 
               border-gray-300 dark:border-gray-600 
               bg-white dark:bg-gray-800 
               text-black dark:text-white 
               placeholder-gray-500 dark:placeholder-gray-400"
    placeholder="Search by keyword (e.g. frontend, python)..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <button
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    onClick={handleSearch}
  >
    Search
  </button>
</div>



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {jobs.map((job) => (
    <div
      key={job.id}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{job.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{job.company_name} — {job.category}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 line-clamp-3">
        {job.description.replace(/<[^>]+>/g, '').slice(0, 200)}...
      </p>
      <a
        href={job.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
      >
        🔗 View Job
      </a>
    </div>
  ))}
</div>

    </div>
    </div>
    </div>
  );
};

export default Jobs;
