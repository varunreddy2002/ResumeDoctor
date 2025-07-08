import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Optional styling

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setDropdownOpen(false);
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
    setDropdownOpen(false);
  };

  const handleSignup = () => {
    navigate('/signup');
    setDropdownOpen(false);
  };

  const handleProfile = () => {
    navigate('/profile');
    setDropdownOpen(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">ResumeDoctor</div>

      <div className="navbar-avatar">
        <img
          src="https://i.pravatar.cc/40" // Replace with actual user image if needed
          alt="avatar"
          className="avatar-img"
          onClick={toggleDropdown}
        />

        {dropdownOpen && (
          <div className="dropdown-menu">
            {isLoggedIn ? (
              <>
                <div onClick={handleProfile}>👤 Profile</div>
                <div onClick={handleLogout}>🚪 Logout</div>
              </>
            ) : (
              <>
                <div onClick={handleLogin}>🔐 Login</div>
                <div onClick={handleSignup}>📝 Signup</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
