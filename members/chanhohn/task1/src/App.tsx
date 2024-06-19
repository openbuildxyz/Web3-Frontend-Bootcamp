import  { useState, useEffect } from 'react';
import Header from './components/Header';
import AddToDo from './components/AddToDo';
import ToDoList from './components/ToDoList';
import { ToDoItemType } from './types';

const App = () => {
  const [todos, setTodos] = useState<ToDoItemType[]>([]);
  
  useEffect(() => {
    const loadTodos = () => {
      const storedTodos = localStorage.getItem('todos');
      setTodos(storedTodos?JSON.parse(storedTodos):[])     
    };
    loadTodos();
  },[]);
 
  useEffect(() => {
    if(todos.length){
      localStorage.setItem('todos', JSON.stringify(todos));
    }
    
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: ToDoItemType = {
      id: Date.now(),
      text,
      isCompleted: false,
    };
    
    setTodos([...todos,newTodo]);
    
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos); 
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo => {
      if(todo.id===id){
        todo.isCompleted=!todo.isCompleted
      }
      return todo
    }))
   
  };

  return (
    <div className="App">
      <Header />
      <AddToDo onAdd={addTodo} />
      <ToDoList todos={todos} onDelete={deleteTodo} onToggleComplete={toggleComplete} />
    </div>
  );
};

export default App;