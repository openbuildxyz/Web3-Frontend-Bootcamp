import { useMemo, useCallback, ChangeEvent } from "react";
import { useLocation } from "react-router-dom";

import { Item } from "./item";
import classnames from "classnames";

import { TOGGLE_ALL } from "../constants";

interface IProps {
  todos: any[];
  dispatch: (...args: any[]) => void;
}

export function Main({ todos, dispatch }: IProps) {
  const { pathname: route } = useLocation();

  const visibleTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (route === "/active") return !todo.completed;

        if (route === "/completed") return todo.completed;

        return todo;
      }),
    [todos, route]
  );

  const toggleAll = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: TOGGLE_ALL, payload: { completed: e.target.checked } }),
    [dispatch]
  );

  return (
    <main className="main" data-testid="main">
      {visibleTodos.length > 0 ? (
        <div className="toggle-all-container">
          <input
            className="toggle-all"
            type="checkbox"
            data-testid="toggle-all"
            checked={visibleTodos.every((todo) => todo.completed)}
            onChange={toggleAll}
          />
          <label className="toggle-all-label" htmlFor="toggle-all">
            Toggle All Input
          </label>
        </div>
      ) : null}
      <ul className={classnames("todo-list")} data-testid="todo-list">
        {visibleTodos.map((todo, index) => (
          <Item todo={todo} key={todo.id} dispatch={dispatch} index={index} />
        ))}
      </ul>
    </main>
  );
}
