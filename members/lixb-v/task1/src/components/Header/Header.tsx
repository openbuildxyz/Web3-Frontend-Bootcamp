import React from 'react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-4">
      {title}
    </h1>
  );
};

Header.displayName = 'Header';
