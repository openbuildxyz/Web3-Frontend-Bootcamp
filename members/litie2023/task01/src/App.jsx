import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import ToDoList from './components/ToDoList'
const appTitle = '待办事件'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="todo-container">
        <Header title={appTitle} />
        <ToDoList />
      </div>
    </>
  )
}

export default App
