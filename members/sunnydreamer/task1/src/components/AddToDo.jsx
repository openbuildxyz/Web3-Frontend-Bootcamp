import { useState } from "react";

const AddToDo = ({ addTask }) => {
    const [input, setInput] = useState("");

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleAddTask = () => {
        addTask(input);
        setInput("");
    };

    return (
        <div className="inputContainer">
            <input
                name="task"
                placeholder="Enter your task"
                value={input}
                onChange={handleInputChange}
            />
            <button onClick={handleAddTask}>Add</button>
        </div>
    );
};

export default AddToDo;
