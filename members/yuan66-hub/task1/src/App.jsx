import { useEffect, useState } from 'react'
import Header from './components/Header'
import ToDoList from './components/TodoList'


function App() {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    const list = localStorage.getItem('list')
    setTodoList(JSON.parse(list) || [])
  }, [])

  useEffect(() => {
    if (todoList.length)
      localStorage.setItem('list', JSON.stringify(todoList))
  }, [todoList])

  const onAdd = (val) => {
    setTodoList([...todoList, {
      name: val,
      status: false
    }])

  }
  const onDel = (index) => {
    const newTodos = todoList.filter((_, i) => i !== index * 1);
    setTodoList([...newTodos]);
  }
  const onFinish = (index) => {
    const newTodos = [...todoList];
    newTodos[index].status = !newTodos[index].status;
    setTodoList(newTodos);
  }

  return (
    <>
      <Header onAdd={onAdd}></Header>
      <ToDoList todoList={todoList} onFinish={onFinish} onDel={onDel}></ToDoList>
    </>
  )
}

export default App
