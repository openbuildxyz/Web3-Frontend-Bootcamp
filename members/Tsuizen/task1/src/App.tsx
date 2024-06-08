import { useEffect, useState } from 'react';

import AddTodo from './components/mods/add-todo';
import TodoList from './components/mods/todo-list';

import { type Todo } from './types/todo';

import './index.css';
import Header from './components/mods/header';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')!) : []
    } catch (err) {
      return []
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.log(error);
    }
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo = { id: Date.now(), text, isCompleted: false };
    setTodos([...todos, newTodo]);
  };

  const toggleStatus = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div className='container h-screen w-screen flex items-center justify-center flex-col gap-4'>
        <Header title='Todo-list' />
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleStatus={toggleStatus}
          deleteTodo={deleteTodo}
        />
      </div>
    </>
  );
}

export default App;
