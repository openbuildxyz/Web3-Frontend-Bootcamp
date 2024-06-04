import React from "react"
import AddToDo from "./AddToDo"

export function Header({ addTodo }) {
    const handleSave = (text) => {
        if (text?.length !== 0) {
            addTodo(text)
        }
    }

    return (
        <header className="header">
            <h1>todos</h1>
            <AddToDo newTodo onSave={handleSave} placeholder="What needs to be done?" />
        </header>
    )
}
