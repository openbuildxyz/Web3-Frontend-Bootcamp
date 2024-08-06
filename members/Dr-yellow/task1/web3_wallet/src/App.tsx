import { useEffect, useState } from 'react'
import './App.scss'
import Header from './components/Header'
import AddBtnToDo from './components/AddBtnToDo'
import ToDoList from './components/ToDoList'
import { ToDo } from './typings'
const ListBox = 'DATA_WEB3_TODOLIST'
function App() {
  const [todoList, setToDoList] = useState<ToDo[]>(() => {
    const storedList = localStorage.getItem(ListBox);
    return storedList && JSON.parse(storedList) || [];
  })

    , onAddToDo = (content: string) => {
      const newItem: ToDo = {
        id: new Date().valueOf(),
        content: content,
        completed: false
      }
      setToDoList([newItem, ...todoList]);
    }

    , onToggleItem = (id: number) => {
      const item = todoList.find(item => item.id === id);
      if (item) {
        item.completed = !item.completed;
        setToDoList([...todoList]);
      }
    }
    , onDeleteItem = (id: number) => setToDoList(todoList.filter(item => item.id !== id))

  useEffect(() => {
    try {
      localStorage.setItem(ListBox, JSON.stringify(todoList));

    } catch (e) {
      console.log('e---', e)
    }
  }, [todoList])

  return (

    <div className="app">
      <Header title='welcome to Web3' />
      <AddBtnToDo submit={onAddToDo} />
      <ToDoList list={todoList} toggleItem={onToggleItem} deleteItem={onDeleteItem} />
    </div>

  )
}

export default App
