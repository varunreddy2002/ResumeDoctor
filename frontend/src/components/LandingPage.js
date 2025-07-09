import React, { useState } from 'react';
import './LandingPage.css';
import { auth, provider } from '../firebase'; // Ensure you have firebase.js
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => setIsSignup(prev => !prev);

const handleGoogleLogin = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      localStorage.setItem("userEmail", result.user.email);
      navigate("/home"); // ✅ Correct route
    })
    .catch((error) => {
      console.error("Google Login Error", error);
    });
};


  const backgroundStyle = {
    background: `url(${process.env.PUBLIC_URL}/images/resume-bg.jpg) no-repeat center center/cover`,
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={backgroundStyle}>
      <div className="overlay">
        <h1>Resume Doctor</h1>
        <p>Your AI-Powered Resume Assistant</p>

        <form className="form-box">
          {isSignup && (
            <input type="text" placeholder="Full Name" required />
          )}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          <button className="primary-btn">{isSignup ? 'Sign Up' : 'Login'}</button>
          <button type="button" className="google-btn" onClick={handleGoogleLogin}>
            Login with Google
          </button>
          <button type="button" className="explore-btn" onClick={() => navigate('/upload')}>
            Explore Without Login
          </button>

          <p className="switch-text">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <span onClick={toggleForm}>
              {isSignup ? ' Login' : ' Sign Up'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
