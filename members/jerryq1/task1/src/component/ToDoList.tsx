import ToDoItem from './ToDoItem';


const ToDoList = ({todos, toggleComplete, deleteTodo}) => {
    return (
        <div className={'ToDoList'}>
            {todos.map((todo) => (
                <ToDoItem
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                />
            ))}
        </div>
    );
};

export default ToDoList;
