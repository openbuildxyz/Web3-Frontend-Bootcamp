// src/components/ToDoItem.tsx
import React from 'react';

/**
 * 代表一个待办事项的接口。
 * 
 * @property text 待办事项的内容。
 * @property completed 待办事项的完成状态。
 */
interface ToDo {
    text: string;
    completed: boolean;
}

/**
 * 待办事项组件的属性接口。
 * 
 * @property todo 代表待办事项的数据。
 * @property deleteTodo 删除待办事项的函数。
 * @property toggleComplete 切换待办事项完成状态的函数。
 */
interface ToDoItemProps {
    todo: ToDo;
    deleteTodo: () => void;
    toggleComplete: () => void;
}

/**
 * 待办事项组件，用于显示单个待办事项及其操作。
 * 
 * @param todo 包含待办事项文本和完成状态的对象。
 * @param deleteTodo 点击删除按钮时调用的函数。
 * @param toggleComplete 点击待办事项文本时调用的函数，用于切换完成状态。
 * @returns 返回一个表示待办事项的列表项（<li>）元素。
 */
const ToDoItem: React.FC<ToDoItemProps> = ({ todo, deleteTodo, toggleComplete }) => {
    return (
        <li className={todo.completed ? 'completed' : ''}>
            <span onClick={toggleComplete}>{todo.text}</span>
            <div className='button' onClick={deleteTodo}>×</div>
        </li>
    );
};

export default ToDoItem;