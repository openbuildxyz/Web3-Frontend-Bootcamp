import { Container, Stack } from "@chakra-ui/react";
import AddToDo from "./components/AddToDo";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";
import { TodoProvider } from "./components/TodoContext";

function App() {
  return (
    <>
      <Stack h={"100vh"}>
        <Header />
        <Container>
          <TodoProvider>
            <AddToDo />
            <ToDoList />
          </TodoProvider>
        </Container>
      </Stack>
    </>
  );
}

export default App;
