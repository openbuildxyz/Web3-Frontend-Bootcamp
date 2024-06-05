import React from "react";
import { Button, Input } from "antd";
const ToDoItem = ({ id, label, isDone, toggleItem, deleteItem }) => {
  return (
    <div className="flex" style={{ width: "600px",marginTop:'10px' }}>
      <Input
        type="checkbox"
        checked={isDone}
        className="mr-2"
        onChange={() => toggleItem(id)}
        style={{ height: "20px",
          width: '20px',marginRight:'20px'}}
      />
      <div className="flex-between check-word">
        <div> {label}</div>
        <Button  size="small" danger onClick={() => deleteItem(id)}>删除</Button>
      </div>
    </div>
  );
};

export default ToDoItem;