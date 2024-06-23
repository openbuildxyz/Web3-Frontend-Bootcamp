import './App.css'
import Header from "./components/Header.jsx"
import {ToDoList} from "./components/ToDoList.jsx"
import {AddToDo} from "./components/AddToDo.jsx"
import {useEffect, useState} from "react"

function App() {
    // 初始化状态管理
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos')
        return savedTodos ? JSON.parse(savedTodos) : []
    })

    // 监听 todos 变化，并将其保存到本地存储
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    // 添加与更新 todos 的函数
    const addTodo = (test) => {
        const newTodos = {
            id: Date.now(),
            text: test,
            completed: false
        }
        setTodos([...todos, newTodos])
    }
    // 删除指定id的todo
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }
    // 标记完成切换
    const toggleTodo = (id) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        )
    }
    return (
        <div className="card">
            <Header/>
            <AddToDo addTodo={addTodo} todos={todos}/>
            <ToDoList
                deleteTodo={deleteTodo}
                todos={todos}
                toggleTodo={toggleTodo}
            />
        </div>
    )
}

export default App
