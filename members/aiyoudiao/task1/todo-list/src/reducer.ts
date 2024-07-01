import { ActionType, StoreType } from "./interface";

export default function reducer(
  state: StoreType,
  action: ActionType
): StoreType {
  switch (action.type) {
    case "ADD_TODO":
      if (!action.payload) {
        return state;
      }
      if (state.todoList.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    case "COMPLETE":
      return {
        ...state,
        todoList: state.todoList.filter((t) => t !== action.payload),
      };
    default:
      return state;
  }
}
