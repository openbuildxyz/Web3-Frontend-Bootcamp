/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Todo {
  title: string;
  time: string;
  description: string;
}

const TaskOne = () => {
  const preListStr = localStorage.getItem("list") || "[]";
  const preListArr = JSON.parse(preListStr);
  const [list, setList] = useState<Todo[]>(preListArr);
  const [open, setOpen] = useState<boolean>(false);

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const listStr = JSON.stringify(list);
    console.log(list, listStr);
    localStorage.setItem("list", listStr);
  }, [list]);

  const ToDoItem = ({ data, index }: { data: Todo; index: number }) => {
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleDelete = () => {
      setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
      setOpenConfirm(false);
    };
    const handleSubmitConfirm = () => {
      list.splice(index, 1);
      setList([...list]);
    };

    return (
      <li
        style={{
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid black",
          padding: 12,
          borderTop: index == 0 ? "1px solid black" : "",
        }}
      >
        <span>{data.title}</span>
        <span>{data.description}</span>
        <span>{data.time}</span>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>

        <Dialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ width: 480 }}>
            {"Are you sure?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button onClick={handleSubmitConfirm} autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </li>
    );
  };

  const ToDoList = () => {
    return (
      <ul>
        {list.map((item: Todo, index: number) => (
          <ToDoItem data={item} index={index} />
        ))}
      </ul>
    );
  };

  return (
    <div style={{ padding: 20, boxSizing: "border-box" }}>
      <div style={{ textAlign: "right" }}>
        <Button variant="outlined" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <h3>Todo list</h3>
      <ToDoList />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            formJson.time = new Date().toLocaleString();
            setList([...list, formJson as Todo]);
            handleClose();
          },
        }}
      >
        <DialogTitle>Todo</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            name="title"
            label="Title"
            style={{ marginTop: 12 }}
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            style={{ marginTop: 12 }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskOne;
