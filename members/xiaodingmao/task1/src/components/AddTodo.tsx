import React, { useState } from 'react'
interface Props {
    addTodo: (text: string) => void
}

export default function AddToDo({ addTodo }: Props) {
    const [text, setText] = useState('')
    function hadleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setText(e.target.value)
    }
    const handleClick = (e: React.FormEvent) => {
        e.preventDefault()
        if (text.trim() !== ''){
            addTodo(text)
            setText('')
        }
    }
    return (
        <>
            <input type='text' value={text} onChange={hadleChange} placeholder='add a new todo' />
            <button onClick={handleClick}>add</button>
        </>
    )
}