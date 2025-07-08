import React from 'react';
import './LandingPage.css';
import { signInWithPopup, provider, auth } from '../firebase';

const LandingPage = () => {
    const backgroundStyle = {
    height: "100vh",
    background: "url('/images/resume-bg.jpg') no-repeat center center / cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in user:", user);
      // Redirect or save user to context
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="landing-container">
      <div className="overlay">
        <h1>Resume Doctor</h1>
        <p>Your AI-Powered Resume Assistant</p>
        <button onClick={handleGoogleLogin}>Login with Google</button>
        <div className="features">
          <h3>Features:</h3>
          <ul>
            <li>📄 Resume Parsing</li>
            <li>🤝 Job Matching</li>
            <li>📊 Skill Analysis</li>
            <li>🧠 AI Suggestions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
