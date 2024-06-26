import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h1 className="text-4xl font-bold text-cyan-500">{title}</h1>
    </header>
  );
};

export default Header;
