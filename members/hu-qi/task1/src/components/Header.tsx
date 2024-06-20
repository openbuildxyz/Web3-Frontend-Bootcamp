// src/components/Header.tsx

import logo from '/logo.svg'

function Header() {
  return (
    <header>
      <a href="https://openbuild.xyz" target="_blank" rel="noopener">
          <img src={logo} className="logo" alt="Vite logo" />
      </a>
      <h1>TODO</h1>
    </header>
  );
}

export default Header;
