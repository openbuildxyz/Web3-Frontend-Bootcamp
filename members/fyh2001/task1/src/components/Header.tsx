import React from "react";

interface IHeaderProps {
  title: string;
}

const Header: React.FC<IHeaderProps> = ({ title }) => {
  return (
    <header>
      <div className="text-5 text-red"> {title}</div>
    </header>
  );
};

export default Header;
