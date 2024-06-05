import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

let nextId = 0;

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('myDataKey');
    if (storedData) {
      setTodos(JSON.parse(storedData));
    }
  },[])

  useEffect(() => {
    localStorage.setItem('myDataKey',JSON.stringify(todos));
  },[todos]);

  function handleAddTodo(text) {
    setTodos([
      ...todos,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleChangeTodo(todo) {
    setTodos(
      todos.map((t) => {
        if (t.id === todo.id) {
          return todo;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTodo(todoId) {
    setTodos(todos.filter((t) => t.id !== todoId));
  }

  return (
    <>
      <Header/>
      <AddTodo onAddTodo={handleAddTodo} />
      <ToDoList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}

function Header() {
  return <h1>代办事宜</h1>
}

function AddTodo({onAddTodo}) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="添加任务"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          onAddTodo(text);
        }}>
        添加
      </button>
    </>
  );
}


function ToDoList({todos, onChangeTodo, onDeleteTodo}) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Todo todo={todo} onChange={onChangeTodo} onDelete={onDeleteTodo} />
        </li>
      ))}
    </ul>
  );
}

function Todo({todo, onChange, onDelete}) {
  const [isEditing, setIsEditing] = useState(false);
  let todoContent;
  if (isEditing) {
    todoContent = (
      <>
        <input
          value={todo.text}
          onChange={(e) => {
            onChange({
              ...todo,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>保存</button>
      </>
    );
  } else {
    todoContent = (
      <>
        {todo.text}
        <button onClick={() => setIsEditing(true)}>编辑</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => {
          onChange({
            ...todo,
            done: e.target.checked,
          });
        }}
      />
      {todoContent}
      <button onClick={() => onDelete(todo.id)}>删除</button>
    </label>
  );
}



export default App
