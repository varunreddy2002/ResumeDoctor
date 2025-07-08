import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-6 rounded-lg text-center transition-all
        ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : 'border-gray-400 dark:border-gray-300'}
        text-gray-600 dark:text-gray-200 cursor-pointer`}
    >
      <input {...getInputProps()} />
      <p className="text-lg font-semibold">Upload Your Resume</p>
      <p className="text-sm mt-2 mb-4 text-gray-400">
        Drag & drop a PDF, DOC, or DOCX file here, or click to browse
      </p>

      {file && (
        <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm text-left">
          <p className="text-gray-700 dark:text-gray-200">
            <strong>Selected File:</strong> {file.name}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Size: {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
