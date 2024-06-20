import React, { useContext, useReducer } from "react";
import Store from "./context";
import reducer from "./reducer";

import { usePersistedContext, usePersistedReducer } from "./usePersist";

import TodoList from "./components/ToDoList";
import TodoForm from "./components/AddToDo";
import { StoreType } from "./interface";

const App: React.FC = () => {
  const globalStore = usePersistedContext(useContext(Store), "state");

  const [state, dispatch] = usePersistedReducer<StoreType>(
    useReducer(reducer, globalStore),
    "state"
  );

  return (
    <Store.Provider value={{ ...state, dispatch }}>
      <div className="container">
        <TodoForm />
        <TodoList />
      </div>
    </Store.Provider>
  );
};

export default App;
