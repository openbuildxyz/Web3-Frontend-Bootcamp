
type ToDoItemProps = {
  id: number;
  text: string;
  isCompleted: boolean;
  onToggle: (completed: boolean) => void;
  onDelete: () => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ id, text, isCompleted, onToggle, onDelete }) => {

  return (
    <div className="flex justify-between">
      <div className="">
        <input type="checkbox" id={`todo-checkbox${id}`} name={`todo-checkbox${id}`} checked={isCompleted} onChange={(event) => onToggle(event.target.checked)} />
        <label htmlFor={`todo-checkbox${id}`} className={`select-none ${isCompleted ? "line-through text-slate-500" : ""}`}>{text}</label>
      </div>
      <button onClick={onDelete}>删除</button>
    </div>
  )
}

export default ToDoItem;