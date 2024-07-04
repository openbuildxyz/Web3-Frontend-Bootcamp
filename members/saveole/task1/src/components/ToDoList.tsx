import { Stack } from "@chakra-ui/react";
import ToDoItem from "./ToDoItem";
import { useTodos } from "./TodoContext";

const ToDoList = () => {
  const { todos } = useTodos();
  return (
    <Stack gap={3}>
      {todos?.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} />
      ))}
    </Stack>
  );
};

export default ToDoList;
