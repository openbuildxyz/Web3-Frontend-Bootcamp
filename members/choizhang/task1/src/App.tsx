// src/App.tsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';
import './App.css';

/**
 * 代表一个待办事项的接口。
 * 
 * @property text 待办事项的文本内容。
 * @property completed 表示待办事项是否已完成。
 */
interface ToDo {
  text: string;
  completed: boolean;
}

/**
 * 应用程序的主组件。
 * 
 * 使用React的函数组件形式，管理待办事项的列表，包括添加、删除和标记待办事项为完成。
 * 利用React的Hooks（useState和useEffect）来处理组件的状态和副作用操作，如本地存储的读写。
 */
const App: React.FC = () => {
  // 状态变量，用于存储待办事项列表。
  const [todos, setTodos] = useState<ToDo[]>([]);

  // 使用useEffect钩子，加载存储在本地存储中的待办事项。
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  /**
   * 添加待办事项。
   * 
   * @param todo 待添加的待办事项对象。
   * 新增待办事项后，立即更新本地存储。
   */
  const addTodo = (todo: ToDo) => {
    const _newTodos = [...todos, todo]
    handleSetStorage(_newTodos);
    setTodos([...todos, todo]);
  };

  /**
   * 删除待办事项。
   * 
   * @param index 待删除待办事项的索引。
   * 删除指定索引的待办事项后，立即更新本地存储。
   */
  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    const _newTodos = [...newTodos]
    handleSetStorage(_newTodos);
    setTodos(newTodos);
  };

  /**
   * 标记待办事项为完成或未完成。
   * 
   * @param index 待标记待办事项的索引。
   * 标记指定索引的待办事项为完成或未完成后，立即更新本地存储。
   */
  const toggleComplete = (index: number) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    handleSetStorage(newTodos);
    setTodos(newTodos);
  };

  /**
   * 更新本地存储中的待办事项列表。
   * 
   * @param todos 待更新的待办事项列表。
   */
  const handleSetStorage = (todos: ToDo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // 返回组件的渲染输出。
  return (
    <div>
      <Header />
      <AddToDo addTodo={addTodo} />
      <ToDoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
    </div>
  );
};

export default App;