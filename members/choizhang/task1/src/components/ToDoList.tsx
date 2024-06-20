// src/components/ToDoList.tsx
import React from 'react';
import ToDoItem from './ToDoItem';

/**
 * 代表一个待办事项的接口。
 * 
 * @property text 待办事项的文本内容。
 * @property completed 待办事项的完成状态。
 */
interface ToDo {
  text: string;
  completed: boolean;
}

/**
 * 待办事项列表组件的属性接口。
 * 
 * @property todos 待办事项数组。
 * @property deleteTodo 删除指定待办事项的回调函数。
 * @property toggleComplete 切换指定待办事项完成状态的回调函数。
 */
interface ToDoListProps {
  todos: ToDo[];
  deleteTodo: (index: number) => void;
  toggleComplete: (index: number) => void;
}

/**
 * 待办事项列表组件。
 * 
 * 该组件渲染一个包含多个待办事项的列表。每个待办事项都可以被标记为完成或删除。
 * 
 * @param {ToDoListProps} props 组件的属性，包括待办事项数组、删除和切换完成状态的回调函数。
 * @returns 返回一个包含待办事项列表的无序列表元素。
 */
const ToDoList: React.FC<ToDoListProps> = ({ todos, deleteTodo, toggleComplete }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <ToDoItem
          key={index}
          todo={todo}
          deleteTodo={() => deleteTodo(index)}
          toggleComplete={() => toggleComplete(index)}
        />
      ))}
    </ul>
  );
};

export default ToDoList;