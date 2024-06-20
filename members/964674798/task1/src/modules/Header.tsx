import React from "react";

interface HeaderProps {
  title: string | React.ReactNode;
}

// 应用标题
const Header = (props: HeaderProps) => {
  const { title } = props;
  return <div className="task1Header">{title}</div>;
};

export default Header;
