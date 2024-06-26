import { useState, useEffect } from 'react';
import './app.css';
import Header from './header';
import AddTodo from './add-todo';
import TodoList from './todo-list';

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch (error) {
        console.error(error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const toggleTodo = (id: number) => {
    console.log(id)
    const newTodos = todos.map((todo: Todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo: Todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="container mx-auto px-4">
      <Header />
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
