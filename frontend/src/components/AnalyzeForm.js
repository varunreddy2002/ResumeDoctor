import React, { useState } from "react";
import JobInputForm from "./JobInputForm";
import ResumeUpload from "./ResumeUpload";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AnalyzeForm() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription) return alert("Both fields required!");

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jd", jobDescription);

    try {
      const response = await axios.post(
        "http://0.0.0.0:8080/analyze",  //For local testing
        //"https://resume-doctor-api-1064752273520.us-central1.run.app/api/analyze",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      navigate("/dashboard", { state: { analysis: response.data.analysis } });
    } catch (err) {
      alert("Error analyzing resume");
      console.error(err);
    }
  };

  return (
    <div>
      <JobInputForm jobDescription={jobDescription} setJobDescription={setJobDescription} />
      <ResumeUpload resumeFile={resumeFile} setResumeFile={setResumeFile} />
      <button onClick={handleAnalyze}>Analyze</button>
    </div>
  );
}