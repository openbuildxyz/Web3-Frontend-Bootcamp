/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-04 18:16:26
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-04 20:56:36
 * @Description:
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface StateType {
  todoArr: Array<ToDoType>;
}
type ToDoType = {
  id: number;
  content: string;
  isDone: boolean;
};

const toDoState: StateType = {
  todoArr: [],
};

const toDoStateSlice = createSlice({
  name: "toDoState",
  initialState: toDoState,
  reducers: {
    setToDo(state: StateType, { payload }: PayloadAction<ToDoType>) {
      console.log("我执行setMedia", payload);
      state.todoArr.unshift(payload);
    },
    delToDo(state: StateType, { payload }: PayloadAction<number>) {
      state.todoArr.some((item, index) => {
        if (item.id == payload) {
          state.todoArr.splice(index, 1);
        }
      });
    },
    doneToDo(state: StateType, { payload }: PayloadAction<number>) {
      state.todoArr.some((item, index) => {
        if (item.id == payload) {
          state.todoArr[index].isDone = true;
        }
      });
    },
  },
});

export const { setToDo, delToDo, doneToDo } = toDoStateSlice.actions;
export default toDoStateSlice.reducer;
