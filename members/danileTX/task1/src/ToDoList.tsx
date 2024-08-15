import ToDoItem from "./ToDoItem"
import type { taskItemType } from "./types";

interface ListTasksProps {
    tasksList: taskItemType[];
    removeTaskCallback: (id: string) => void;
    strikeTaskCallback: (id: string) => void;
}

export default function ListTasks(props: ListTasksProps) {
    return (
        <div className="container mt-5">
            <ul className="list-group align-items-center">
                {props.tasksList.map((element,index) => {
                    return (
                        <ToDoItem
                            key={index}
                            task={element}
                            removeTaskCallback={props.removeTaskCallback}
                            strikeTaskCallback={props.strikeTaskCallback}
                        />
                    )
                }
                )}
            </ul>
        </div>
    )
}