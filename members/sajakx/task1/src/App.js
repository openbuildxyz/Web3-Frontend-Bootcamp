import './App.css';
import Header from './components/Header.tsx'
import AddToDo from './components/AddToDo.tsx'
import ToDoList from './components/ToDoList.tsx'
import { useEffect, useState, } from 'react';

function App() {
  const [todoLists, setTodLists] = useState([])

  useEffect(() => {
    const storageLists = JSON.parse(localStorage.getItem('toDoLists'))
    if (storageLists) {
      setTodLists(storageLists)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todoLists', JSON.stringify(todoLists));
  }, [todoLists]);

  const addTodo = (value) => {
    setTodLists([...todoLists, { id: Date.now(), title: value, complete: false }])
  }


  const deleteTodoItem = (id) => {
    // const newList = todoLists.filter(todo => todo.id !== id)
    // console.log('newList',id, newList)
    setTodLists(todoLists.filter(todo => todo.id !== id));
  }

  const toggleTodoItem = (id) => {
     setTodLists(todoLists.map(item=>item.id===id?{...item,complete:!item.complete}:item))


  }
  return (
    <div className='App'>
      <Header />
      <AddToDo addTodo={addTodo} />
      <ToDoList
        todoLists={todoLists}
        deleteTodoItem={deleteTodoItem}
        toggleTodoItem={toggleTodoItem}
      />
    </div>


  );
}

export default App;
