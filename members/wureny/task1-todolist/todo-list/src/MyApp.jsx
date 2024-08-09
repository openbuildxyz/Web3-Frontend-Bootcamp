import React, { useState, useEffect } from 'react';

export function MyApp() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const addTodo = (text) => {
    const newTodo = {
      id: todos.length + 1,
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <Header />
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Todo List</h1>
    </header>
  );
}


function TodoList({ todos, deleteTodo, toggleComplete }) {
    return (
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
          />
        ))}
      </ul>
    );
  }
  
  function TodoItem({ todo, deleteTodo, toggleComplete }) {
    return (
      <li>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </li>
    );
  }
  
  function AddTodo({ addTodo }) {
    const [value, setValue] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new todo"
        />
        <button type="submit">Add</button>
      </form>
    );
  }
  