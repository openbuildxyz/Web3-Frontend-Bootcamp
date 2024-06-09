import { Dispatch, useEffect } from "react";
import { ActionType } from "./interface";
export function usePersistedContext<T>(context: T, key: string = "state"): T {
  const persistedContext = localStorage.getItem(key);
  return persistedContext ? JSON.parse(persistedContext) : context;
}
export function usePersistedReducer<T>(
  [state, dispatch]: [T, Dispatch<ActionType>],
  key: string = "state"
): [T, Dispatch<ActionType>] {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);
  return [state, dispatch];
}
