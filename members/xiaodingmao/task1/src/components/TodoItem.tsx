import React, { Todo } from '../App'

interface Props {
    index: number
    todo: Todo
    toggleTodo: (index: number) => void
    deleteTodo: (index: number) => void
}
export default function TodoItem({ index, todo, toggleTodo, deleteTodo }: Props) {
    return (
        <li>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(index)} />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={() => {
                deleteTodo(index)
            }}>X</button>
        </li>
    )

}