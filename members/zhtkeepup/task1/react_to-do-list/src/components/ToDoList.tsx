import React from "react";

import { useState } from "react";

import TodoItem from "./ToDoItem";

import FilterButton from "./FilterButton";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function TodoList({ tasks, setTasks }) {
  // const [filter, setFilter] = useState("All");

  //   const filterList = FILTER_NAMES.map((name) => (
  //     <FilterButton
  //       key={name}
  //       name={name}
  //       isPressed={name === filter}
  //       setFilter={setFilter}
  //     />
  //   ));

  const taskList = tasks
    // .filter(FILTER_MAP[filter])
    .map((task) => (
      <TodoItem
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        tasks={tasks}
        setTasks={setTasks}
      />
    ));

  return (
    <ul
      role="list"
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
    >
      {taskList}
    </ul>
  );
}

export default TodoList;
