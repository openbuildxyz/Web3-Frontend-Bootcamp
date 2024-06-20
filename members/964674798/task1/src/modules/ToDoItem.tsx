import React from "react";
import { Button, Checkbox } from "antd";

const ToDoItem = (props) => {
  const { thing, isFinish, id, onChange, onDelete } = props;
  return (
    <div className="toDoItemWrapper">
      <div>
        <Checkbox
          checked={isFinish}
          onChange={(e) => {
            onChange(id, e.target.checked);
          }}
        >
          <div className="toDoItemThing">{thing}</div>
        </Checkbox>
      </div>
      <Button
        type="text"
        onClick={() => {
          onDelete(id);
        }}
      >
        删除
      </Button>
    </div>
  );
};

export default ToDoItem;
