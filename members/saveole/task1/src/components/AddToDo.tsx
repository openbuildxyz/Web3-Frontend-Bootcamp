import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useTodos } from "./TodoContext";

const AddToDo = () => {
  const [newTodo, setNewTodo] = useState("");

  const { addTodo } = useTodos();

  const addNewTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === "") alert("请输入具体内容哦");
    addTodo(newTodo);
    setNewTodo("");
  };

  return (
    <form onSubmit={addNewTodo}>
      <Flex gap={2}>
        <Input
          placeholder="没东西写？想想今天有没有好好工作！"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          ref={(input) => input && input.focus()}
        />
        <Button mx={2} type="submit">
          <IoMdAdd size={30} />
        </Button>
      </Flex>
    </form>
  );
};

export default AddToDo;
