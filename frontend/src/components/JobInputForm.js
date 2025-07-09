import React, { useState } from 'react';

const JobInputForm = () => {
  const [inputMode, setInputMode] = useState('url');

  return (
    <div className="border dark:border-gray-700 p-4 rounded-md">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setInputMode('url')}
          className={`px-4 py-2 rounded-md ${inputMode === 'url' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
        >
          Job URL
        </button>
        <button
          onClick={() => setInputMode('manual')}
          className={`px-4 py-2 rounded-md ${inputMode === 'manual' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
        >
          Manual Input
        </button>
      </div>

      {inputMode === 'url' ? (
        <div>
          <label className="block text-sm mb-1">Job Posting URL</label>
          <input
            type="url"
            placeholder="https://company.com/careers/job-posting"
            className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
          />
          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">Fetch</button>
        </div>
      ) : (
        <div>
    
          <label className="block text-sm mb-1">Job Description</label>
          <textarea
            rows="5"
            placeholder="Paste the complete job description here..."
            className="w-full p-2 rounded border dark:bg-gray-800 dark:border-gray-600"
          ></textarea>

          <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">Process Job Description</button>
        </div>
      )}
    </div>
  );
};

export default JobInputForm;
                        