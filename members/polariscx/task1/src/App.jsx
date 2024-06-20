import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';
import ThemeSwitcher from './components/ThemeSwitcher';

const App = () => {
  const [todos, setTodos] = useState(() => {
    try {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
      console.log('Todos saved to localStorage:', todos);
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
    }
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = { text, completed: false, id: Date.now() };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) => 
      prevTodos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    );
  };

  return (
    <div className="App">
      <Header />
      <ThemeSwitcher />
      <div className="container">
        <div className="centered-content">
          <AddToDo addTodo={addTodo} />
          <ToDoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
        </div>
      </div>
    </div>
  );
};

export default App;



// import React, { useState, useEffect } from 'react';
// import Header from './components/Header';
// import ToDoList from './components/ToDoList';
// import AddToDo from './components/AddToDo';
// import ThemeSwitcher from './components/ThemeSwitcher';

// const App = () => {
//   const [todos, setTodos] = useState(() => {
//     // 从localStorage中恢复数据，作为useState的初始值
//     try {
//       const storedTodos = localStorage.getItem('todos');
//       return storedTodos ? JSON.parse(storedTodos) : [];
//     } catch (error) {
//       console.error('Failed to load todos from localStorage:', error);
//       return [];
//     }
//   });

//   // useEffect(() => {
//   //   try {
//   //     const storedTodos = localStorage.getItem('todos');
//   //     if (storedTodos) {
//   //       setTodos(JSON.parse(storedTodos));
//   //     }
//   //   } catch (error) {
//   //     console.error('Failed to load todos from localStorage:', error);
//   //   }
//   // }, []);

//   useEffect(() => {
//     try {
//       localStorage.setItem('todos', JSON.stringify(todos));
//     } catch (error) {
//       console.error('Failed to save todos to localStorage:', error);
//     }
//   }, [todos]);
//   const addTodo = (text) => {
//     const newTodo = { text, completed: false, id: Date.now() };
//     setTodos([...todos, newTodo]);
//   };

//   const deleteTodo = (id) => {
//     setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
//   };

//   const toggleComplete = (id) => {
//     setTodos((prevTodos) => 
//       prevTodos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
//     );
//   };

//   return (
//     <div className="App">
//       <Header />
//       <ThemeSwitcher />
//       <div className="container">
//         <div className="centered-content">
//             <AddToDo addTodo={addTodo} />
//             <ToDoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
//           </div>
//       </div>
//     </div>
//   );
//   // return (
//   //   <div className="App">
//   //     <Header />
//   //     <div className="container">
//   //       <ThemeSwitcher />
//   //       <AddToDo addTodo={addTodo} />
//   //       <ToDoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
//   //     </div>
//   //   </div>
//   // );
// };

// export default App;

