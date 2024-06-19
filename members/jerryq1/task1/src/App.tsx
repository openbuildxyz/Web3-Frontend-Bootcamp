import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./component/Header";
import ToDoList from "./component/ToDoList";
import AddToDo from "./component/AddToDo";

function App() {
    const localStorageTodos = localStorage.getItem('todos')
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    const [todos, setTodos] = useState(localStorageTodos? storedTodos:[]);



    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) setTodos(storedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (title) => {
        const newTodo = { id: Date.now(), title, completed: false };
        setTodos([...todos, newTodo]);
    };

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };
  return (
    <>
        <Header/>
        <ToDoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
        <AddToDo addTodo={addTodo}/>
    </>
  )
}

export default App
