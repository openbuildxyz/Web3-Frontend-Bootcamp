import React from "react";
import { TodoHeaderProps } from "../interface";


export const TodoHeader: React.FC<TodoHeaderProps> = (props) => (
  <div className="mt-3 row">
    <div className="col">
      <p className="float-left h6">待做事项</p>
    </div>
    <div className="col">
      {props.children}
    </div>
  </div>
);
