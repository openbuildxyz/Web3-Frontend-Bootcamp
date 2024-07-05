import ListItem from "./ListItem"

interface ListProps {
    todoList: {content: string; completed: boolean}[]
    deleteItem: (index: number) => void
    toggleItem: (index: number) => void
}

const List = ({todoList, deleteItem, toggleItem}: ListProps) => {
    return (
        <ul>
            {todoList.map((todo: any, index: number) => (
                <ListItem
                    key={index}
                    todo={todo}
                    index={index}
                    deleteItem={deleteItem}
                    toggleItem={toggleItem}
                />
            ))}
        </ul>
    )
}

export default List