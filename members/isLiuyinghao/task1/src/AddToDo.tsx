import { useState } from 'react';

function AddToDo({ onAdd }: { onAdd: (text: string) => void }) {
    const [text, setText] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!text) return;
        onAdd(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className='flex'>
            <input type="text" className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={text} onChange={(e) => setText(e.target.value)} placeholder="添加新待办事项" />
            <button type="submit" className='flex-none w-14 '>添加</button>
        </form>
    );
}

export default AddToDo;