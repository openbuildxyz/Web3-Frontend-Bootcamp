interface ListItemProps {
    content: string;
    completed: boolean;
}

interface Props {
    todo: ListItemProps;
    index: number;
    deleteItem: (index: number) => void;
    toggleItem: (index: number) => void;
}

const ListItem = ({todo, index, deleteItem, toggleItem}: Props) => {
    return (
        <li>
            {todo.content}
            <button onClick={() => toggleItem(index)}>
                {!todo.completed ? 'Undo' : 'Completed'}
            </button>
            <button onClick={() => deleteItem(index)}>
                Delete
            </button>
        </li>
    )
}

export default ListItem