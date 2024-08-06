// src/components/AddToDo.tsx
import React, { useState } from 'react';

interface AddToDoProps {
    addTodo: (text: string) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({ addTodo }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            addTodo(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='输入待办事项'
            />
            <button type='submit'>添加</button>
        </form>
    );
};

export default AddToDo;
