import React from "react";

const ResumeUpload = ({ resumeFile, setResumeFile }) => {
  const handleChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  return (
    <div className="p-4 border border-dashed border-blue-400 rounded-lg text-white">
      <label
        htmlFor="resume-upload"
        className="cursor-pointer flex flex-col items-center justify-center text-blue-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0l-4 4m4-4l4 4m5 0v12m0 0l-4-4m4 4l4-4"
          />
        </svg>
        Upload Your Resume
        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="hidden"
        />
      </label>
      {resumeFile && (
        <p className="mt-2 text-sm text-gray-400">{resumeFile.name}</p>
      )}
    </div>
  );
};

export default ResumeUpload;