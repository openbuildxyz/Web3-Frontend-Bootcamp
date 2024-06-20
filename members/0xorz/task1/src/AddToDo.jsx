import { useState } from 'react';

function AddToDo({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text) return;
        onAdd(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="添加新待办事项" />
            <button type="submit">添加</button>
        </form>
    );
}

export default AddToDo;