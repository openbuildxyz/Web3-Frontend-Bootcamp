import React, { useEffect, useState } from 'react';
import Header from './components/todo-header';
import TodoList from './components/todo-list';
import { TodoItem } from './components/todo-item';
import AddTodo from './components/add-todo';

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const handleAddTodo = (input: string) => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false, id: todos.length + 1 }]);
    }
  };

  const handleToggleComplete = (item: TodoItem) => {
    const newTodos = todos.map(todo => (todo.id === item.id ? { ...todo, completed: !todo.completed } : todo));
    setTodos(newTodos);
  };

  const handleDeleteTodo = (item: TodoItem) => {
    const newTodos = todos.filter(todo => item.id !== todo.id);
    setTodos(newTodos);
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 rounded-lg shadow-lg bg-white">
      <Header />
      <AddTodo onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onToggleComplete={handleToggleComplete} onDeleteTodo={handleDeleteTodo} />
    </div>
  );
};

export default Todo;
