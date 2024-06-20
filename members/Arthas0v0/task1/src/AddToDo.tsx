import React, { useState } from 'react';

const AddToDo = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addToDoItem = () => {
    if (inputValue.trim()) { // 避免添加空的待办事项
      onAdd(inputValue); // 调用父组件传递的函数
      setInputValue(''); // 清空输入框
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={addToDoItem}>Add</button>
    </div>
  );
};

export default AddToDo;