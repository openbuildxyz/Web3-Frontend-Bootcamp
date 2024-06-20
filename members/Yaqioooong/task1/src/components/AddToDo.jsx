import React,{useState} from "react";
function AddToDo({ onAddTodo }) {
    const [input, setInput] = useState('');
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onAddTodo(input);
            setInput('');
        }
    };
    return (
        <form className={"add-todo"} onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="添加待办事项"
            />
            <button className="add-btn" type="submit">添加</button>
        </form>
    );
}
export default AddToDo;