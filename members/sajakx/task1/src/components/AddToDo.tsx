import React ,{  useState } from "react";


export default function AddToDo({addTodo}) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text) return;
        addTodo(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="add new item" />
            <button type="submit">add</button>
        </form>
    )

}