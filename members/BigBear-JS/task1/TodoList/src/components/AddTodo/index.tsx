import { useState } from 'react';
import './index.css'

interface AddTodoProps {
    onAdd: (text: string) => void;
}
export default function AddTodo({ onAdd }: AddTodoProps) {
    const [text, setText] = useState<string>('')
    const addText = () => {
        if (text.trim() === '') {
            alert('Please enter a todo')
            return
        }
        onAdd(text)
        setText('')
    }

    return (
        <div className="addtodo">
            <input 
                type="text" 
                placeholder="Add Todo" 
                value={text} 
                onChange={e => setText(e.target.value)}
            />
            <button onClick={addText}>Add</button>
        </div>
    )
}