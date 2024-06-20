// src/components/AddToDo.tsx
import React, { useState } from 'react';
import { AddToDoProps } from '../types';

// 定义 AddToDo 组件，允许用户添加新的待办事项
const AddToDo: React.FC<AddToDoProps> = ({ addTodo }) => {
  const [text, setText] = useState('');  // 定义输入框的状态

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();  // 阻止表单的默认提交行为
    if (!text.trim()) return;  // 如果输入为空则返回
    addTodo({
      id: Date.now(),  // 使用当前时间戳作为唯一 ID
      text,
      completed: false  // 新的待办事项初始状态为未完成
    });
    setText('');  // 清空输入框
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={text}  // 输入框的值
        onChange={(e) => setText(e.target.value)}  // 更新输入框的值
        placeholder="输入待办事项" 
  
        className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button 
       className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-shrink-0"
      type="submit">添加</button>  
    </form>
  );
};

export default AddToDo;  // 导出 AddToDo 组件
