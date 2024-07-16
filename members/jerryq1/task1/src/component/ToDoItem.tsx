
const ToDoItem = ({ todo, toggleComplete, deleteTodo }) => {
    return (
        <div className={'item'}>
            <div className={'item_left'}>
                <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)}/>
                {' '}
                {todo.title}
            </div>
            <button onClick={() => deleteTodo(todo.id)} className={'del'}>del</button>
        </div>
    );
};



export default ToDoItem;
