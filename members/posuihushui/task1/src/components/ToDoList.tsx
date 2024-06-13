import React from "react";
import { ITodoItem, ToDoItem } from "./ToDoItem";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const ToDoList: React.FC<{
  list: ITodoItem[];
  markTaskStatus: (v: Omit<ITodoItem, "text">) => void;
  deleteTask: (v: number) => void;
}> = ({ list, markTaskStatus, deleteTask }) => {
  const sortedList = list
    .filter((v) => !v.completed)
    .concat(...list.filter((v) => v.completed));
  return (
    <div className="divide-y">
      {list.length > 0 ? (
        sortedList.map((item) => (
          <ToDoItem
            {...item}
            key={item.id}
            markTaskStatus={markTaskStatus}
            deleteTask={deleteTask}
          />
        ))
      ) : (
        <Alert className="space-y-2">
          <AlertTitle>Congratulations, you have no pending tasks!</AlertTitle>
          <AlertDescription>
            You have completed all your tasks, now you can relax or create new
            tasks.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
