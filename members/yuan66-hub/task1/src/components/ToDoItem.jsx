

export default function ToDoItem({ children, finish, del }) {
    return (
        <li>
            {children}
            <button onClick={finish}>完成</button>
            <button onClick={del}>删除</button>
        </li>
    )
}