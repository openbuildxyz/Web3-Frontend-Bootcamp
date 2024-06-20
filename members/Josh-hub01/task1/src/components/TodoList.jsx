import ToDoItem from "./TodoItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

const style = {
  py: 0,
  width: "100%",
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
  marginTop: "24px",
};

export default function TodoList(props) {
  const { todos, setTodos } = props;

  return (
    <List sx={style} aria-label="mailbox folders">
      {todos.map((todo, index) => (
        <div key={todo.id}>
          <ListItem>
            <ToDoItem todo={todo} todos={todos} setTodos={setTodos}>
              {todo.title}
            </ToDoItem>
          </ListItem>
          <Divider component="li" />
        </div>
      ))}
    </List>
  );
}
