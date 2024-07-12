import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { Todo } from "../types/types";
import {
  MdDelete,
  MdCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { useTodos } from "./TodoContext";

const ToDoItem = ({ todo }: { todo: Todo }) => {
  const { deleteTodo, updateTodo } = useTodos();
  return (
    <Flex gap={2} alignItems={"center"} my={2}>
      <Flex
        flex={1}
        alignItems={"center"}
        borderColor={"gray.600"}
        border={"1px"}
        borderRadius={"lg"}
        p={2}
        justifyContent={"space-between"}
      >
        <Text
          color={todo.completed ? "gray.700" : "blue.700"}
          textDecoration={todo.completed ? "line-through" : "none"}
        >
          {todo.text}
        </Text>
        {todo.completed && (
          <Badge ml="1" colorScheme="green">
            Done
          </Badge>
        )}
        {!todo.completed && (
          <Badge ml="1" colorScheme="blue">
            In Progress
          </Badge>
        )}
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Box
          color={"green.500"}
          cursor={"pointer"}
          onClick={() => updateTodo(todo.id)}
        >
          {!todo.completed && <MdOutlineCheckBoxOutlineBlank size={25} />}
          {todo.completed && <MdCheckBox size={25} />}
        </Box>
        <Box
          color={"red.500"}
          cursor={"pointer"}
          onClick={() => deleteTodo(todo.id)}
        >
          <MdDelete size={25} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default ToDoItem;
