import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setMessage('');
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      setMessage('');
      const response = await axios.post("http://localhost:8888/api/upload-resume", formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

      setMessage('✅ Upload successful!');
    } catch (error) {
      console.error(error);
      setMessage('❌ Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

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
    <div className="border-2 border-dashed p-6 rounded-lg text-center text-gray-600 dark:text-gray-200 transition-all">
      <div
        {...getRootProps()}
        className={`cursor-pointer p-4 border rounded-md ${
          isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : 'border-gray-400 dark:border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-lg font-semibold">Upload Your Resume</p>
        <p className="text-sm mt-2 mb-4 text-gray-400">
          Drag & drop a PDF, DOC, or DOCX file here, or click to browse
        </p>
      </div>

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

      {file && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload Resume'}
        </button>
      )}

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
};

export default ResumeUpload;
