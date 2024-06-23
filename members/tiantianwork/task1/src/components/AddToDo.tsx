import React, { useState } from 'react';

interface PropsType {
  addTodo: (params: string) => void
}

const AddToDo = ({ addTodo }: PropsType) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.trim()) {
            addTodo(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center mt-4">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border rounded p-2 w-full max-w-md"
                placeholder="输入新的待办事项"
            />
            <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">添加</button>
        </form>
    );
};

export default AddToDo;