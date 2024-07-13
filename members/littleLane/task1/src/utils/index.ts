import { ToDoEntity } from "../interfaces";
import { STORAGE_KEY } from "./constants";

/**
 * localStorage 格式化工具
 * @returns
 */
export function parseLocalStorage() {
  let localList: ToDoEntity[] = [];

  try {
    localList = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (error) {
    console.error(error);
  }

  return localList;
}

/**
 * 设置 localStorage
 * @param localList
 */
export function setLocalStorage(localList: ToDoEntity[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localList));
}
