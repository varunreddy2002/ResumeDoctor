import React, { useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("userEmail", result.user.email);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Google Login Error", error);
      });
  };

  const handleSignup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        localStorage.setItem("userEmail", userCredential.user.email);
        navigate('/home');
      })
      .catch((error) => {
        alert("Signup failed: " + error.message);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      handleSignup(email, password);
    } else {
      // Implement login logic here if needed
    }
  };

  const backgroundStyle = {
    background: `url(${process.env.PUBLIC_URL}/images/resume-bg.jpg) no-repeat center center/cover`,
    height: '100vh',
    width: '100vw',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div className="landing-container" style={backgroundStyle}>
      <div className="overlay">
        <h1>Resume Doctor</h1>
        <p>Your AI-Powered Resume Assistant</p>

        <form className="form-box" onSubmit={handleFormSubmit}>
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="primary-btn" type="submit">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>

          <button type="button" className="google-btn" onClick={handleGoogleLogin}>
            Login with Google
          </button>

          <button type="button" className="explore-btn" onClick={() => navigate('/home')}>
            Explore Without Login
          </button>

          <p className="switch-text">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <span onClick={() => setIsSignup(prev => !prev)}>
              {isSignup ? ' Login' : ' Sign Up'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
