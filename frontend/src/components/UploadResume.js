// frontend/src/components/UploadResume.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UploadResume.css';

const UploadResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['application/pdf', 
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                          'application/msword'];
    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
      setUploadStatus('');
    } else {
      setSelectedFile(null);
      setUploadStatus('❌ Please upload a valid .pdf or .docx file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('❌ Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsUploading(true);
      const res = await axios.post("http://localhost:8000/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadStatus("✅ " + res.data.message);
      setTimeout(() => navigate('/analysis'), 1000); // redirect after 1s
    } catch (error) {
      setUploadStatus("❌ Upload failed: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload Your Resume</h1>
      <p className="upload-subtitle">Accepted formats: .pdf, .docx</p>

      <input 
        type="file" 
        onChange={handleFileChange} 
        accept=".pdf,.doc,.docx" 
        className="file-input"
      />

      <button 
        className="upload-btn" 
        onClick={handleUpload}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload Resume'}
      </button>

      {uploadStatus && (
        <p className="upload-status">{uploadStatus}</p>
      )}
    </div>
  );
};

export default UploadResume;
