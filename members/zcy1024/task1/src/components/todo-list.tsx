import ToDoItem from "./todo-item";

export default function ToDoList(props: any) {
    const { list, clickCheck, clickRemove } = props;

    return (
        <ul>
            {
                list.map((item: any) => {
                    return <ToDoItem key={item.id} completed={item.completed} content={item.content}
                    clickCheck={(completed: boolean) => {
                        clickCheck(item.id, completed);
                    }}
                    clickRemove={() => { clickRemove(item.id) }}></ToDoItem>
                })
            }
        </ul>
    )
}