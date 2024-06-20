// src/components/AddToDo.tsx

import { useState } from 'react';
import Add from '../assets/add.svg'
import type { Props } from '../TodoList' 

function AddToDo({ todos, setTodos }: Props) {
    const [inputValue, setInputValue] = useState<string>("");
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!inputValue) return;
        const newTodo = {
            title: inputValue.trim(),
            id: self.crypto.randomUUID(),
            is_completed: false,
        };

        // Update todo state
        setTodos((prevTodos) => [newTodo, ...prevTodos]);

        // Store updated todo list in local storage
        const updatedTodoList = JSON.stringify([...todos, newTodo]);
        localStorage.setItem("todos", updatedTodoList);

        setInputValue("");
    };

    return (
        <form className="add-todo" onSubmit={handleSubmit}>
            <label htmlFor="todo">
                <input
                    type="text"
                    name="todo"
                    id="todo"
                    placeholder="How do you do?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                />
            </label>

            <button>
                <img src={Add} className="add" alt="Sumbit Task" />
            </button>
        </form>
    );
}

export default AddToDo;