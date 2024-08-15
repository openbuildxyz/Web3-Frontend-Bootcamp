import { FaTrash } from "react-icons/fa";
import type { taskItemType } from "./types";

interface ToDoItemProps {
    task: taskItemType;
    removeTaskCallback: (id: string) => void;
    strikeTaskCallback: (id: string) => void
}


function ToDoItem(props: ToDoItemProps) {
    return (
        <li className="list-group-item w-50" key={props.task?.id}>
            <div className="row justify-content-around">
                <div className="col-9">
                    <p className="vertical-center ml-3">
                        <input onChange={() => props.strikeTaskCallback(props.task.id)} className="form-check-input me-3" type="checkbox" value="" id="flexCheckDefault" checked={props.task.strike} />
                        {props.task.strike ?
                            <del>{props.task.text}</del> :
                            <>{props.task.text}</>
                        }
                    </p>
                </div>
                <div className="col-3 px-0">
                    <button
                        className="btn btn-danger"
                        style={{ height: "fit-content" }}
                        value={props.task.id}
                        onClick={() => props.removeTaskCallback(props.task.id)}
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
        </li>
    )
}

export default ToDoItem;