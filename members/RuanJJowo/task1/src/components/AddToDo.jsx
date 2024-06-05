import { useState } from "react";
import React from "react";
import { Button, Input, Form, Checkbox } from "antd";
const AddToDo = ({ addItem }) => {
  const [item, setItem] = useState("");

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  const handleSubmit = (e) => {
    if (item.trim().length !== 0) {
      addItem(item);
      setItem("");
    }
  };

  return (
    <div>
      <Form name="basic">
        <Form.Item
          label="toDoName"
          name="toDoName"
          rules={[
            {
              required: true,
              message: "请输入!",
            },
          ]}
        >
          {" "}
          <div className="flex-between">
            <Input
              value={item}
              onChange={handleChange}
              placeholder="请输入"
              autoFocus
              className="todo-input"
            />
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              添加
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddToDo;
