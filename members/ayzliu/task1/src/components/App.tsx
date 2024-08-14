import { useState, useEffect } from "react";
import Header from "./Header";
import ToDoItem from "./ToDoItem";
import ToDoList from "./ToDoList";
import AddToDo from "./AddToDo";

interface ToDoItem{
  id:number;
  text:string;
  completed:boolean;

}
const App = () => {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if(newTodo.trim()){
      setTodos([...todos, {id: Date.now(), text: newTodo, completed: false}]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id:number) => {
    setTodos(todos.map(todo => (todo.id === id? {...todo, completed: !todo.completed}: todo)))
  };

  const deleteTodo = (id:number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="max-w-md w-full mt-8">
        <Header />
      <AddToDo newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
      <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </div>
    </div>
  )
}


export default App
