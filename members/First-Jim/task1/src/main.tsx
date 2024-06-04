import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/reset.less';
import App from './App';
import TodoStore from "@/models/todo";
import { getSnapshot, destroy, onSnapshot } from "mobx-state-tree";
import { connectReduxDevtools } from "mst-middlewares";
import 'virtual:svg-icons-register';
import "todomvc-app-css/index.css";
const localStorageKey = "mst-todomvc-example";

const initialState = localStorage.getItem(localStorageKey)
  ? JSON.parse(localStorage.getItem(localStorageKey))
  : {
      todos: [
        {
          text: "learn Mobx",
          completed: false,
          id: 0,
        },
        {
          text: "learn MST",
          completed: false,
          id: 1,
        },
      ],
    };

let store;
let snapshotListenerDestroyer;

function createTodoStore(snapshot) {
  // clean up snapshot listener
  if (snapshotListenerDestroyer) snapshotListenerDestroyer();
  // kill old store to prevent accidental use and run clean up hooks
  if (store) destroy(store);

  // create new one
  window.store = store = TodoStore.create(snapshot);

  // connect devtools
  // connectReduxDevtools(require("remotedev"), store);
  // connect local storage
  snapshotListenerDestroyer = onSnapshot(store, (snapshot) =>
    localStorage.setItem(localStorageKey, JSON.stringify(snapshot))
  );

  return store;
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App store={ createTodoStore(initialState)}/>
	</React.StrictMode>,
);
