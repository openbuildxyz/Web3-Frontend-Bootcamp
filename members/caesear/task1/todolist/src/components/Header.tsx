// src/components/Header.tsx
import React from 'react';

// 定义 Header 组件，用于显示应用标题
const Header: React.FC = () => {
  return (
    <header>
      <h1 className="text-2xl font-bold text-center mb-4">待办事项</h1>  
    </header>
  );
};

export default Header;  // 导出 Header 组件
