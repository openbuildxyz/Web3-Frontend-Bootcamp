import React, { useState, useEffect } from 'react';
import { Todo } from './i'
import Header from './Header'
import ToDoList from './ToDoList'
import AddToDo from './AddToDo'

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
      const localData = localStorage.getItem('todos');
      return localData ? JSON.parse(localData) : [];
  });
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleAddClick = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleCompleteClick = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDeleteClick = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div>
      <Header />
      <ToDoList todos={todos} handleCompleteClick={handleCompleteClick} handleDeleteClick={handleDeleteClick} />
      <AddToDo newTodo={newTodo} handleInputChange={handleInputChange} handleAddClick={handleAddClick} />
    </div>
  );
};

export default App;
