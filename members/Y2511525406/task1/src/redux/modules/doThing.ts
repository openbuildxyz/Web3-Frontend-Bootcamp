/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-04 18:16:26
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-14 23:09:08
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

type ChangeToDo = {
  id: number;
  stateToDo: boolean;
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
    changeToDo(state: StateType, { payload }: PayloadAction<ChangeToDo>) {
      state.todoArr.some((item, index) => {
        if (item.id == payload.id) {
          state.todoArr[index].isDone = payload.stateToDo;
        }
      });
    },
  },
});

export const { setToDo, delToDo, changeToDo } = toDoStateSlice.actions;
export default toDoStateSlice.reducer;
