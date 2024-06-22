import { useState } from "react";
import React from 'react';  
import { Button,Input } from 'antd';
const AddToDo = ({ addItem }) => {
  const [item, setItem] = useState("");

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(item);
    setItem("");
  };

  return (
    <div className="flex-between">
      <Input
        value={item}
        onChange={handleChange}
        placeholder="请输入"
        autoFocus
        className="todo-input"
      />
      <Button
        type="primary"
        onClick={handleSubmit}
      >
        添加
      </Button>
    </div>
  );
};

export default AddToDo;