// src/components/AddToDo.tsx
import React, { useState } from 'react';

/**
 * AddToDo 组件接口定义了添加待办事项的功能。
 * 
 * @param addTodo - 一个回调函数，用于将新的待办事项添加到外部的待办事项列表中。
 *                  函数接受一个对象参数，该对象包含待办事项的文本和完成状态。
 */
interface AddToDoProps {
  addTodo: (todo: { text: string; completed: boolean }) => void;
}

/**
 * AddToDo 组件用于让用户输入并添加新的待办事项。
 * 
 * 通过 useState hook 管理输入文本的状态，并在用户提交表单时，
 * 使用 addTodo prop 提交新的待办事项。
 */
const AddToDo: React.FC<AddToDoProps> = ({ addTodo }) => {
  // 使用 useState 管理输入框的文本值
  const [text, setText] = useState<string>('');

  /**
   * 处理表单提交事件。
   * 
   * 阻止默认表单提交行为，检查输入文本是否为空，
   * 如果不为空，则调用 addTodo 回调函数提交新的待办事项，
   * 并清空输入框的文本。
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo({ text, completed: false });
      setText('');
    }
  };

  // 返回表单组件，包括一个输入框和一个提交按钮
  // 输入框的值与 text state 绑定，输入框的变化更新 text state
  // 提交按钮在点击时触发 handleSubmit 函数
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add ToDo</button>
    </form>
  );
};

export default AddToDo;