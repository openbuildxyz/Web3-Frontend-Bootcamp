import React, { useState, useEffect } from 'react';
import './ToDoList.css';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [saveTimeout, setSaveTimeout] = useState(null);

  // 从 localStorage 加载任务
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // 每次 tasks 变化时保存到 localStorage
  useEffect(() => {
    // 清除之前的 timeout 防止多次保存
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    // 使用 setTimeout 延迟保存
    const timeoutId = setTimeout(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, 500); // 延迟 500 毫秒

    // 保存 timeout ID，以便在下一次状态更新时清除
    setSaveTimeout(timeoutId);
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="输入新的待办事项"
        />
        <button onClick={addTask}>添加</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTaskCompletion(index)}>{task.text}</span>
            <button className="complete-button" onClick={() => toggleTaskCompletion(index)}>
              {task.completed ? '未完成' : '已完成'}
            </button>
            <button className="delete-button" onClick={() => deleteTask(index)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;

