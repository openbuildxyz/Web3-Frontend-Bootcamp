/* eslint-disable react/prop-types */
import ToDoItem from "../ToDoItem/toDoItem";
import "./toDolist.less"
function ToDoList(props) {
    const { todo ,removeTodo} = props;
    return (
      <div>
        <ul>
          {todo.map((todoItem, index) => (
            <li key={index}>
              <ToDoItem item={todoItem} removeTodo={removeTodo} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

export default ToDoList;