import { memo } from "react";

const ToDoItem = memo(
  ({ item, onDeleteItem, onSwitchCompleteItem }: ToDoItemProps) => {
    const { complete, value, key } = item;
    return (
      <div className="item">
        <input
          type="checkbox"
          checked={complete}
          onChange={(e) => onSwitchCompleteItem(key, e.target.checked)}
        />
        <span className={"item-text " + (complete ? "complete" : "")}>
          {value}
        </span>
        <button className="ToDoItem-button" onClick={() => onDeleteItem(key)}>
          X
        </button>
      </div>
    );
  }
);

export default ToDoItem;
