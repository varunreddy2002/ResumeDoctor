import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = ({ user, darkMode, toggleDarkMode }) => {
  const [showMenu, setShowMenu] = useState(false);
  const firstName = user.displayName?.split(' ')[0] || 'User';
  const location = useLocation();

  return (
    <header className="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-900 flex justify-between items-center shadow-sm">
      {/* Left - Logo */}
      <Link
        to="/home"
        className="text-xl font-bold text-black dark:text-white no-underline hover:no-underline focus:no-underline"
      >
        Resume Doctor
      </Link>

      {/* Right - Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Jobs Button */}
        <Link
          to="/jobs"
          className={`text-sm font-medium px-4 py-2 border rounded transition ${
            location.pathname === '/jobs'
              ? 'bg-blue-600 text-white'
              : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
          }`}
        >
          Jobs
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="text-yellow-500 dark:text-blue-300 text-lg p-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span className="text-sm">{firstName}</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-md w-36 z-50">
              <button
                onClick={() => signOut(auth)}
                className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
