import { Button, Input } from "antd";
import { useState } from "react";
import "./App.css";
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}
function App() {
    const [todos, setTodos] = useState<Todo[]>([{ id: 1, text: "learning React", completed: true }]);
    const [input, setInput] = useState("");

    const addTodo = () => {
        if (input.trim() === "") return;

        const newTodo: Todo = {
            id: Date.now(),
            text: input,
            completed: false,
        };

        setTodos([...todos, newTodo]);
        setInput("");
    };

    return (
        <>
            <div className="App">
                <div className="grid-paper">
                    <h1 className="todo-title flex items-center">
                        <div className="h-4 w-4 bg-white rounded-full  mx-2"></div>
                        Todo List
                    </h1>
                    <ul>
                        {todos.map((todo, index) => (
                            <li key={index} className="flex justify-between items-center mb-2">
                                <div className="mr-4">
                                    {index + 1}.{todo.text}
                                </div>
                                <Button className="bg-#74b9ff text-white">Completed</Button>
                            </li>
                        ))}
                    </ul>
                    <div className="input-container flex justify-between">
                        <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} style={{ width: "300px", marginRight: "10px" }} />
                        <Button className="bg-#74b9ff text-white" onClick={addTodo}>
                            Add Todo
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
