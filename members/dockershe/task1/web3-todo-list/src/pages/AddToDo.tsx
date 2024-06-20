// AddToDo.tsx
import React, { useState } from 'react';

interface AddToDoProps {
  onAddToDo: (newTodo: { text: string; completed: boolean }) => void;
}


const AddToDo: React.FC<AddToDoProps> = ({ onAddToDo }) => {
  const [todo, setTodo] = useState('');

  const handleAddToDo = () => {
    if (todo.trim() !== '') {
      onAddToDo({ text: todo, completed: false }); // 将新的待办事项作为对象传递给 onAddToDo
      setTodo(''); // 清空输入框
    }
  };

  const styles = {
    color: 'red'
  };

  return (
    <div className="add-content-wrapper">
      <input type="text" value={todo} className="add-content" onChange={(e) => setTodo(e.target.value)}  />
      <div className="tips" style={styles}>💡请输入内容！</div>
      <button className="btn submit-btn" onClick={handleAddToDo}>Add ToDo</button>
    </div>
  );
};

export default AddToDo;