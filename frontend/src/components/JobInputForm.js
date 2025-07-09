import React from "react";

const JobInputForm = ({ jobDescription, setJobDescription }) => {
  return (
    <textarea
      className="w-full p-4 text-white bg-gray-800 border border-gray-600 rounded-md placeholder-gray-400"
      rows={8}
      placeholder="Paste the job description here..."
      value={jobDescription}
      onChange={(e) => setJobDescription(e.target.value)}
    />
  );
};

export default JobInputForm;
