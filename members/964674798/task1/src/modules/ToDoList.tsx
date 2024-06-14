import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = (props) => {
  const { dataSource, onChange, onDelete } = props;
  return (
    <div>
      {dataSource.map((item) => {
        return (
          <ToDoItem
            onChange={onChange}
            onDelete={onDelete}
            key={item?.id}
            {...item}
          />
        );
      })}
    </div>
  );
};

export default ToDoList;
