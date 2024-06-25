import React, { useState } from "react";
import { Input, Button, List, Checkbox, Typography } from "antd";

const { Text } = Typography;

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #f0f0f0",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center" }}>ToDo List</h1>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a new task"
        onPressEnter={handleAddTask}
        style={{ marginBottom: "10px" }}
      />
      <Button type="primary" onClick={handleAddTask} block>
        Add
      </Button>
      <List
        style={{ marginTop: "20px" }}
        bordered
        dataSource={tasks}
        renderItem={(task, index) => (
          <List.Item>
            <Checkbox
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            >
              <Text delete={task.completed}>{task.text} </Text>
            </Checkbox>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ToDoList;
