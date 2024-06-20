import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import AddToDo from './components/AddToDo'
import ToDoList from './components/ToDoList'
import { ToDo } from './typings'

function App() {
  const [todoList, setToDoList] = useState<ToDo[]>(() => {
    const storedList = localStorage.getItem('todoList');
    return storedList ? JSON.parse(storedList) : [];
  });

  const onAddToDo = (content: string) => {
    const newItem: ToDo = {
      id: new Date().valueOf(),
      content: content,
      completed: false
    }
    setToDoList([newItem, ...todoList]);
  }

  const onToggleItem = (id: number) => {
    const item = todoList.find(item => item.id === id);
    if (item) {
      item.completed = !item.completed;
      // todoList.sort((a, b) => {
      //   return a.completed === b.completed ? 0 : a.completed ? 1 : -1
      // })
      setToDoList([...todoList]);
    }
  }
  const onDeleteItem = (id: number) => {
    setToDoList(todoList.filter(item => item.id !== id));
  }

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList])

  return (
    <div>
      <div className="app">
        <Header />
        <AddToDo submit={onAddToDo} />
        <ToDoList list={todoList} toggleItem={onToggleItem} deleteItem={onDeleteItem} />
      </div>
    </div>
  )
}

export default App
