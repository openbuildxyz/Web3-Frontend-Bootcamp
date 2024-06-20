import { useState } from "react"
import './addTodo.css'

const AddToDo = ({addTodo}) => {
    const [inputValue, setInputValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputValue.trim()) {
            addTodo(inputValue)
            setInputValue("")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={(e) => {
                setInputValue(e.target.value)
            }}></input>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddToDo;