import { useCallback } from "react"
import "./ToDoItem.css";

export interface ITodoItem {
  id: string;
  text: string;
  done: boolean;
}

type IProps = ITodoItem & {
  onRemove: () => void;
  onDone: (flag: boolean) => void;
}

const ToDoItem: React.FC<IProps> = (props) => {

  const { done, text, onRemove, onDone } = props;
  const handleDone = useCallback(() => {
    onDone(!done);
  }, [done, onDone]);

  return (
    <li>
      <span className={"todoitem__text "+(done ? "--finished" : "")} onClick={handleDone}>{text}</span>
      <button className="remove-btn" onClick={onRemove}>
        X
      </button>
    </li>
  )
}

export default ToDoItem