import { useState, useEffect } from 'react';
import Header from './Header.tsx';
import ToDoList from './ToDoList.tsx';
import AddToDo from './AddToDo';
export type ToDoItemType = {
  id:number;
  completed:boolean;
  text:string;
}
const App = () => {
  const [todos, setTodos] = useState<ToDoItemType[]>(() => {
   return JSON.parse(localStorage.getItem('todos')||'[]')
  });

  // useEffect(() => {
  //   console.log('init @@@',localStorage.getItem('todos')||'[]');
  //   const savedTodos = JSON.parse(localStorage.getItem('todos')||'[]');
  //   console.log('savedTodos',savedTodos);
  //   if (savedTodos) {
  //     setTodos(savedTodos);
  //   }
  // }, []);

  useEffect(() => {
    console.log('todo change @@@',todos);

    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('localStorage.getItem',localStorage.getItem('todos')||'[]');
  }, [todos]);

  const addTodo = (todo:ToDoItemType) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id:number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id:number) => {
    setTodos(todos.map((todo:ToDoItemType) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div>
      <Header />
      <AddToDo addTodo={addTodo} />
      <ToDoList todos={todos} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />
    </div>
  );
};

export default App;
