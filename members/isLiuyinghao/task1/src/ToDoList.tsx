import ToDoItem from './ToDoItem';

function ToDoList({ items, onToggle, onDelete }: any) {
    return (
        <fieldset>
            {items.map((item: { id: string; }) => (
                <ToDoItem key={item.id} item={item} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </fieldset>
    );
}

export default ToDoList;