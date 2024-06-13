import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { ToDoItemProp } from "./components/ToDoItem";
import ToDoList from "./components/ToDoList";
import AddToDo from "./components/AddToDo";
function App() {
    const [todos, setTodos] = useState<ToDoItemProp[]>([{ id: 1, text: "learning React", completed: true }]);

    const addTodo = (newTodo: ToDoItemProp) => {
        setTodos([...todos, newTodo]);
    };
    return (
        <>
            <div className="App">
                <div className="grid-paper">
                    <Header></Header>
                    <ToDoList todos={todos}></ToDoList>
                    <AddToDo addTodo={addTodo}></AddToDo>
                </div>
            </div>
        </>
    );
}

export default App;
