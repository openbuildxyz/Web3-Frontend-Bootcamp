import TodoItem from "./TodoItem";

interface TodoListProps {
  todoList: TodoItem[];
  deleteTodoItem: (id: number) => void;
  toggle: (id: number) => void;
}

const TodoList = ({ todoList, deleteTodoItem, toggle }: TodoListProps) => {
  return (
    <div>
      {todoList.length > 0 ? (
        todoList.map((item, index) => (
          <TodoItem
            key={index}
            id={item.id}
            text={item.text}
            isComplete={item.isComplete}
            deleteTodoItem={deleteTodoItem}
            toggle={toggle}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center mt-4 text-lg">没有待办事项</p>
      )}
    </div>
  );
};

export default TodoList;
