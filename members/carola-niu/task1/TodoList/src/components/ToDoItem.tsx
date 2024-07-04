// display the todo item
// function: add a new todo item
// function: delete a todo item
// function: make a todo item done
import { Todo } from '../App';

function TodoItem ({todo, completeTodo, deleteTodo}: {todo: Todo, completeTodo: (id: number) => void, deleteTodo: (id: number) => void}){
    const handleComplete =()=>{
        completeTodo(todo.id);
    }

    const handleDelete =()=>{
        deleteTodo(todo.id);
    }

    return (
        <div className={`todo-item ${todo.isCompleted ? 'completed':''}`}>
            <input
                type = "checkbox"
                checked = {todo.isCompleted}
                onChange = {handleComplete}
            />
            <li className="todo-item-text">{todo.text}</li>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default TodoItem;