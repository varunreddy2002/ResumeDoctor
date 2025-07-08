import React from 'react';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
      <h1 className="text-xl font-bold">🩺 Resume Doctor</h1>
      <button
        onClick={toggleDarkMode}
        className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded text-sm"
      >
        Toggle {darkMode ? 'Light' : 'Dark'}
      </button>
    </header>
  );
};

export default Header;
