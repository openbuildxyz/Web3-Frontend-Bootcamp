import React from 'react';

const ToDoItem = ({ todo, deleteTodo, toggleComplete }) => {
  return (
    <li style={{margin:'5px'
    }}>
      <span
        style={{
          
          display: 'inline-block',
          textDecoration: todo.completed ? 'line-through' : 'none',
          // color: 'black',
          // backgroundColor: 'gray',
          width: '270px', // 设置固定宽度
          paddingLeft: '10px', // 增加左侧内间距
          paddingRight: '10px', // 增加右侧内间距
          whiteSpace: 'normal', // 允许文本自动换行
          lineHeight: '1.5', // 设置行高
          wordBreak: 'break-word' // 允许单词在必要时换行
        }}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

export default ToDoItem;
