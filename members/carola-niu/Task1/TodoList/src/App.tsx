import { useEffect,useState } from 'react'
import Header from './components/Header'
import AddToDo from './components/AddToDo'
import ToDoList from './components/ToDoList'
import './App.css'


export interface Todo {
  id: number
  text: string
  isCompleted: boolean
}
function App() {
  const [todos, setTodos] = useState<Todo[]>(()=>{
    const saved = localStorage.getItem('todos');
    const initialValue = JSON.parse(saved || '[]');
    return initialValue;
});
  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo =(text:string)=>{
    const newTodo ={
      id: Date.now(),
      text: text,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };  

  const completedTodo = (id: number) =>{
    setTodos(todos.map(todo=>todo.id===id?{...todo, isCompleted: !todo.isCompleted}:todo));
  };

  const deleteTodo = (id: number) =>{
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <Header title="Todo List"/>
      <AddToDo addTodo={addTodo}/>
      <ToDoList todos={todos} completedTodo={completedTodo} deleteTodo={deleteTodo}/>
    </div>
  );
}

export default App;
