import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';

// 定义待办事项的类型
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// 定义 App 组件的状态
interface AppState {
  todos: Todo[];
  input: string;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const storedTodos = localStorage.getItem('todos');
    return {
      todos: storedTodos ? JSON.parse(storedTodos) : [],
      input: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setState(prevState => ({
      ...prevState,
      todos: [...prevState.todos, newTodo],
    }));
  };

  const deleteTodo = (id: number) => {
    setState(prevState => ({
      ...prevState,
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  const toggleTodo = (id: number) => {
    setState(prevState => ({
      ...prevState,
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  const handleInputChange = (input: string) => {
    setState(prevState => ({
      ...prevState,
      input,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.input) {
      addTodo(state.input);
    }
  };

  return (
    <div className="App">
      <Header />
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={state.input}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <button type="submit">添加</button>
      </form>
      <ToDoList 
        todos={state.todos} 
        onDelete={deleteTodo} 
        onToggle={toggleTodo} 
      />
    </div>
  );
};

export default App;