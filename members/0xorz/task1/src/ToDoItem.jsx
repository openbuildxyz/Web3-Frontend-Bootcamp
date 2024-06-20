function ToDoItem({ item, onToggle, onDelete }) {
    return (
        <li style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
            <span onClick={() => onToggle(item.id)} style={{ cursor: 'pointer' }}>
                {item.text}
            </span>
            <button onClick={() => onDelete(item.id)}>删除</button>
        </li>
    );
}

export default ToDoItem;