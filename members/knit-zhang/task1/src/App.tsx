import Header from './component/Header'
import AddToDo from './component/AddToDo'
import ToDoList from './component/TodoList'
import { useState, useEffect } from 'react';
import { ToDo } from './types/ToDo';

function App() {

  // 初始化 toDo 状态 并从 localstorage 中读取缓存参数
  const [toDo, setToDo] = useState<ToDo[]>(() => {
    const storedTodos = localStorage.getItem('toDoList');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  // 添加 todo
  function handleAdd(text: string) {
    // 生成下一个id
    const id = toDo.length + 1;
    setToDo([
      ...toDo,
      {id, text, complete: false}
    ]);
  }

  // 保存 todo 到 localstorage
  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDo));
  }, [toDo])

  // 以下三个函数分别用于改变 toDo 状态、更改todo内容、删除 todo功能
  function toggleCheck(id: number) {
    setToDo(
      toDo.map(todo => {
        if (todo.id === id) {
          todo.complete = !todo.complete
        }
        return todo
      })
    )
  }

  function changeText(id: number, text: string) {
    setToDo(
      toDo.map(todo => {
        if (todo.id === id) {
          todo.text = text
        }
        return todo
      })
    )
  }


  const handleDelete: (id: number) => void = (id) => {
    setToDo(toDo.filter(todo => todo.id !== id));
  }

  return (
    <>
      <Header />
      <AddToDo onAdd={handleAdd} />
      <ToDoList items={toDo} onCheck={toggleCheck} onDelete={handleDelete} onTextChange={changeText} />
    </>
  )
}

export default App
