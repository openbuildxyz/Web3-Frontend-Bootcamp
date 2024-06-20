/*
 * @Author: Jacket-mzl
 * @Date: 2024-06-04 18:11:14
 * @LastEditors: Jacket-mzl
 * @LastEditTime: 2024-06-04 18:34:45
 * @Description:
 */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import storage from "redux-persist/lib/storage";
import toDoState from "./modules/doThing";

// create reducer
const reducer = combineReducers({ toDoState });

// redux 持久化配置
const persistConfig = {
  key: "redux-state",
  storage: storage,
};

const persistReducerConfig = persistReducer(persistConfig, reducer);
// store
export const store = configureStore({
  reducer: persistReducerConfig,
  devTools: true,
});

// create persist store
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
