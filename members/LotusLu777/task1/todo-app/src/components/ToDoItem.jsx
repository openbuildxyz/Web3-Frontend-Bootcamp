import PropTypes from 'prop-types';

function ToDoItem({todo, todos, setTodos, index}) {
    const handleDelete = () => {
        setTodos(todos.filter((_, i)=>i!==index));
    };
    const toggleComplete = () =>{
        setTodos(todos.map((item, i) =>
            i === index ? {...item, isCompleted: !item.isCompleted} :item
        ));
    };

    return (
        <div style ={{ textDecoration :todo.isCompleted ?'line-through' :'none'}}>
            {todo.text}
            <button onClick ={toggleComplete}>
                {todo.isCompleted ? '未完成' :'完成'}
            </button>
            <button onClick={handleDelete}>删除</button>
        </div>
    )
}

ToDoItem.propTypes = {
    todo: PropTypes.shape({
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired
    }).isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired
    })).isRequired,
    setTodos: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

export default ToDoItem;