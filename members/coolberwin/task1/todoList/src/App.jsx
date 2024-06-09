import React,{useEffect,useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Header from './components/Header';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';


function App() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'))|| [];
    setTodos(storedTodos);
  },[]);// 空依赖数组，表示仅在组件挂载和卸载时执行

  // useEffect 钩子  在todos 状态改变时保存到贝蒂存储
  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos]);/// 依赖todos，当todos改变时执行

  // 添加待办事项的函数

  const addTodo = (text)=>{
    setTodos([...todos,{text, completed:false}]);
  };

  // 删除待办事项的函数
  const deleteTodo = (index)=>{
    const newTodos = todos.filter((_,todoIndex)=>todoIndex !== index);
    setTodos(newTodos);
  }; 

    // 切换待办事项完成状态的函数
  const toggleCompleted = (index)=>{
    const newTodos = todos.map((todo, i)=>i === index?{...todo, completed:!todo.completed}:todo);
    setTodos(newTodos);
  }


 return (
  <div className="App">
    <Header />
    <AddToDo addTodo={addTodo}/>
    <ToDoList todos={todos} deleteTodo={deleteTodo} toggleCompleted={toggleCompleted} />
  </div>
 )
}

export default App
