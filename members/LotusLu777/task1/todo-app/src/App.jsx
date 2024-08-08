import './styles/App.css';
import Header from './components/header';
import ToDoList from './components/ToDoList'
import AddTodo from './components/AddToDo'
import  {useState, useEffect} from 'react';

function App(){
    const [todos, setTodos] = useState(()=> {
         // 尝试从 localStorage 中恢复 todos 数据
        const savedTodos = localStorage.getItem('todos');
        const parsedTodos = savedTodos ?JSON.parse(savedTodos):[];
        console.log("Loaded from localStorage:",parsedTodos);
        return parsedTodos;

    });

    useEffect(() => {
        // 当 todos 状态更新时，将其保存到 localStorage
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log("Saved to localStorage", todos);

    },[todos]);

    return(
        <div className='app-container'>
            <Header />
            <AddTodo setTodos={setTodos} />
            <ToDoList todos={todos} setTodos = {setTodos} />
        </div>

    );
}
export default App;