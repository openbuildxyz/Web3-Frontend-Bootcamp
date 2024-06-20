import React, { useState } from 'react';

interface AddToDoProps {
    addTodo: (text: string) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({ addTodo }) => {
    const [text, setText] = useState<string>('');

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
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="添加新的待办事项"
            />
            <button type="submit">添加</button>
        </form>
    );
};

export default AddToDo;