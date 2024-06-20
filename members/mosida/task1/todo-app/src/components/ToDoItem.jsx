import React from 'react';

function ToDoItem({ todo, onToggleCompleted, onDeleteTodo }) {
    const itemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    };


    return (
        <li style={itemStyle}>
            <span style={{ flex: 1, textAlign: 'left', textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
            </span>
            <div>
                <button onClick={onToggleCompleted}>{todo.completed ? '撤销' : '完成'}</button>
                <button onClick={onDeleteTodo}>删除</button>
            </div>
        </li>
    );
}

export default ToDoItem;
