import { Header, ToDoList, AddToDo } from './components'
import { useEffect, useState } from 'react'

function App() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('todos'))
        if (todos?.length > 0) {
            setTodos(todos)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    function deleteTodo(id) {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    function toggleTodoStatus(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    return (
        <>
            <Header title={"ToDoList"} />
            <ToDoList todos={todos} setTodos={setTodos} deleteTodo={deleteTodo} toggleTodoStatus={toggleTodoStatus} />
            <AddToDo todos={todos} setTodos={setTodos} />
        </>
    )
}

export default App