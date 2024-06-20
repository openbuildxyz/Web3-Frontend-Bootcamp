import {Tag} from 'antd';
import './index.css'

function ToDoItem({todo}) {
  return (
    <>
      <div className="to-do-item">
        {!todo.status ? <Tag color="#f50">Undo</Tag> : <Tag color="#2db7f5">Done</Tag>}
        {todo.text}
      </div>
    </>
  );
}

export default ToDoItem;
