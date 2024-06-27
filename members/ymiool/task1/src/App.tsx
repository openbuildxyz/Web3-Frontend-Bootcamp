import { useEffect, useState } from 'react';
import './App.css'
import AddToDo from './components/AddToDo'
import Header from './components/Header'
import ToDoList from './components/ToDoList'

export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

function useLocalStorageState<T>(key: string, initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(() => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}

function App() {
  const [todos, setTodos] = useLocalStorageState<TodoItem[]>('todos', []);

  return (
    <>
      <Header></Header>
      <AddToDo setTodos={setTodos}></AddToDo>
      <ToDoList todos={todos} setTodos={setTodos}></ToDoList>
    </>
  )
}

export default App;
