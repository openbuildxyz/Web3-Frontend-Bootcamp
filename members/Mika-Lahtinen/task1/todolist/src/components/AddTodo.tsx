import { useState } from 'react'
const AddTodo = ({ addTodo }) => {
    const [todoText, setTodoText] = useState('')

    const submitCreate = (event) => {
        event.preventDefault();

        const todoInput = {
            id: Date.now(),
            text: todoText,
            completed: false,
        };

        addTodo(todoInput);
        setTodoText('');
    }

    return (
        <form onSubmit={submitCreate}>
            <input
                type="text"
                value={todoText}
                onChange={(event) => setTodoText(event.target.value)}
                placeholder="Add todo here plz..."
            />
            <button type="submit">Add it</button>
        </form>
    );
};

export default AddTodo