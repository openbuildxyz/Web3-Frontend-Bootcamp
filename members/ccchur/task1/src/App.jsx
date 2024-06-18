import { useState,useEffect } from 'react'
import './App.css'
// import { AddToDo } from './components/AddToDo';
import { Header } from './components/Header';
import { ToDoList } from './components/ToDoList';
import { AddToDo } from './components/AddToDo';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos && savedTodos!== '[]') { // 添加判断条件
    setTodos(JSON.parse(savedTodos));
  }
}, []);

  useEffect(() => {
    
  // 保存当前状态到本地存储
    localStorage.setItem('todos', JSON.stringify(todos));
   
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
     
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i!== index);
    setTodos(newTodos);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index? {...todo, completed:!todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleToggleUncomplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index? {...todo, completed:false, status: "未完成" } : todo
    );
    setTodos(updatedTodos);
  };
  return (
    <>
      <Header></Header>
      <AddToDo inputValue={inputValue} setInputValue={setInputValue} handleAddTodo={handleAddTodo} />
      <ToDoList todos={todos} handleDeleteTodo={handleDeleteTodo} handleToggleComplete={handleToggleComplete} handleToggleUncomplete={handleToggleUncomplete} />
    </>
  )
}

export default App
