import { Todo } from "../../types"
import TodoItem from "../TodoItem"
import './index.css'

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}
export default function TodoList({todos, onDelete, onToggle}: TodoListProps) {

    return (
        <ul className="todolist">
            {
                todos.map(todo => {
                    return <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
                })
            }
        </ul>
    )
}