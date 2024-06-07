import React, { useState } from 'react';

interface AddToDoProps {
    addToDo: (text: string) => void;
}

const AddToDo: React.FC<AddToDoProps> = ({ addToDo }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            addToDo(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddToDo;
