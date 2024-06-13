import style from "./index.module.css";

const ToDoItem = (props) => {
  const { item, onDelToDo, onUpdate } = props

  const handleDelete = () => {
    onDelToDo(item.id)
  };

  const handleClick = () => {
    onUpdate(item.id)
  };

  return (
    <div className={style.item} onClick={() => handleClick()}>
      {item.status ? <del>{item.title}</del> : <span>{item.title}</span>}

        <span 
            className={style.delBtn}
            onClick={(e) => {
                e.stopPropagation()
                handleDelete()
            }}
        >
        x
      </span>
    </div>
  );
};

export default ToDoItem;
