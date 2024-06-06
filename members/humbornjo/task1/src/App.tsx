import { useState, useEffect } from 'react'
import Header from './component/Header.tsx'
import AddToDo from './component/AddToDo.tsx'
import ToDoList from './component/ToDoList.tsx'
import { Todo } from './model/todo.ts'
import './App.css'
import './css/global.css'

const getUnixTime = (): number => {
  return Math.floor(Date.now() / 1000);
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (title: string, description: string) => {
    const newTodo: Todo = {
      id: todos.length + 1 + getUnixTime(),
      title,
      description,
      create_time: new Date(),
      update_time: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  const handleDelTodo = (id: number) => {
    const newTodos = todos.filter(item => item.id !== id)
    setTodos([...newTodos]);
  }

  return (
    <>
      <Header />
      <ToDoList todos={todos} onDel={handleDelTodo} />
      <AddToDo onAdd={handleAddTodo} />
    </>
  )
}

export default App
