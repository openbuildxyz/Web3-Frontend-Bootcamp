import React, { useState } from 'react';

const AddToDo = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 阻止空提交
    if (!text.trim()) return;
    // 添加新的待办事项
    addTodo(text);
    // 将输入框清空
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="添加新的待办事项"
      />
      <button type="submit">添加</button>
    </form>
  );
};

export default AddToDo;
