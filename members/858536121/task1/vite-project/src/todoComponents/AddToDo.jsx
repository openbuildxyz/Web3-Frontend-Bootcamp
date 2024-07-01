import { useState } from "react";
function AddToDo({onAddClick}) {
  const [todo, setTodo] = useState("");
  const onChangeTodo = (e) => {
    setTodo(e.target.value);
  };
  // const onAddClick = () => {
  //     // console.log(todo)

  // }
  return (
    <div>
      <input
        value={todo}
        onChange={(env) => {
          onChangeTodo(env);
        }}
        style={{ width: "200px", fontSize: "16px" }}
      ></input>
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => {
          onAddClick(todo)
        }}
      >
        添加
      </button>
    </div>
  );
}

export default AddToDo;
