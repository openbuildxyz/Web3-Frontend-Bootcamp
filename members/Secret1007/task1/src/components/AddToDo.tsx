import { Input, Button } from "antd";
import { useState } from "react";
import { ToDoItemProp } from "./ToDoItem";

interface AddToDoProps {
    addTodo: (todo: ToDoItemProp) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({ addTodo }) => {
    const [input, setInput] = useState("");
    const handleSubmit = () => {
        const newTodo: ToDoItemProp = {
            id: Date.now(), // 使用当前时间戳作为ID
            text: input,
            completed: false,
        };
        if (input.trim() === "") {
            return;
        }

        addTodo(newTodo);
        setInput(""); // 清空输入框
    };
    return (
        <div className="input-container flex justify-between">
            <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} style={{ width: "300px", marginRight: "10px" }} />
            <Button className="bg-#74b9ff text-white" onClick={handleSubmit}>
                Add Todo
            </Button>
        </div>
    );
};

export default AddToDo;
