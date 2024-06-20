import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";

import styles from "./index.module.scss";

export default function AddToDo(props) {
  const { todos, setTodos } = props;
  const [title, setTitle] = useState("");

  const onChange = (event) => {
    setTitle(event.target.value);
  };

  const handlerAdd = () => {
    if (title.trim() === "") return;

    setTodos([...todos, { title, id: uuidv4(), status: 0 }]);
  };

  return (
    <div className={styles.addToDo}>
      <TextField fullWidth label="请输入" value={title} onChange={onChange} />
      <Button variant="contained" onClick={handlerAdd}>
        Add
      </Button>
    </div>
  );
}
