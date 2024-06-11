import { useEffect, useState } from 'react'
import './App.css'
import _ from 'lodash'
import classNames from 'classnames'
import {v4 as uuidV4} from 'uuid'
// import dayjs from 'dayjs'
import { useRef } from 'react'
import AddToDo  from './components/AddToDo'
import ToDoList from './components/ToDoList'
import Header from './components/Header'


function App() {
  const [todos,setTodos] = useState([
    {id: 1, text: '健身', isDone: true},
    {id: 2, text: '吃饭', isDone: false}
  ])
  
  const STORAGE_ID = 'task1-todolist';
  
  const saveToLocal = (todos) => {
    window.localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
    console.info('===saved===', todos);
  }

  useEffect(() => {
    saveToLocal(todos);
  }, [todos]);
  
  const addTodo = (todo) => {
    setTodos((prevTodos) => [todo, ...prevTodos]);
    todos.map((todo) => {
      console.log(todo)
    })
  }

  const changeDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  }

  const deleteTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => 
        todo.id !== id
      )
    );
  }
  return (
    <div className="App">
      <div className='todo-container'>
        <div class="todo-wrap">
        <Header/>
        <AddToDo addTodo={addTodo}/>
        <ToDoList
          todos={todos}
          changeDone={changeDone}
          deleteTodo={deleteTodo}
        />
        </div>
      </div>
    </div>
  );
}

export default App;
