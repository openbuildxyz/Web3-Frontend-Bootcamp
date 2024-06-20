function ToDoItem({ item, onToggle, onDelete }: any) {
    return (
        <div className="flex p-1">
            <label className="peer">
                <input type="checkbox" name={item.text} checked={item.completed} onChange={() => onToggle(item.id)} />

            </label>
            <p className="peer-has-[:checked]:line-through flex-1 w-64">
                {item.text}
            </p>
            <button className="flex-none w-14 " onClick={() => onDelete(item.id)}>删除</button>
        </div>
    );
}

export default ToDoItem;