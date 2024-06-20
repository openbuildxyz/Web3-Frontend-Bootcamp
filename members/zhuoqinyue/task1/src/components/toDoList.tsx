import { Todo } from "./types";
import ToDoItem from "./toDoItem";

interface ToDoListProps {
  todoList: Todo[];
  finishTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const ToDoList = ({ todoList, finishTodo, deleteTodo }: ToDoListProps) =>
  todoList?.map((item) => (
    <ToDoItem
      key={item?.id}
      todoItem={item}
      finishTodo={finishTodo}
      deleteTodo={deleteTodo}
    />
  ));

export default ToDoList;
