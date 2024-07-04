import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function AddToDo({ todos, setTodos }) {
    const [input, setInput] = useState('')

    function handleAddToDo() {
        if (input) {
            setTodos([...todos, {
                id: uuidv4(),
                content: input,
                completed: false
            }])
            setInput('')
        }
    }

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleAddToDo}>Add</button>
        </div>
    )
}

export { AddToDo }