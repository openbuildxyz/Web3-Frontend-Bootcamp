import React, { useState } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light'); // Default theme
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setShowMenu(false); // Hide menu after selecting a theme
  };

  return (
    <div className="theme-switcher">
      <button onClick={toggleMenu}>Change Theme</button>
      {showMenu && (
        <div className="theme-options">
          <button onClick={() => changeTheme('light')}>Light</button>
          <button onClick={() => changeTheme('dark')}>Dark</button>
          <button onClick={() => changeTheme('system')}>System</button>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
