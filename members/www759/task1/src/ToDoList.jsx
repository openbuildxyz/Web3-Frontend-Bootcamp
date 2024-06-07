import ToDoItem from "./ToDoItem";

const ToDoList = ({todoList, deleteTodo, toggleTodo}) => {
    return (
        <ul>
            {todoList.map((todo, index) => (
                <ToDoItem key={index} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo}/>
            ))}
        </ul>
    )
}

export default ToDoList;