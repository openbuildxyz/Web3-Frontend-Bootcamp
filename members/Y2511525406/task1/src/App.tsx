import "./App.css";
import AddToDo from "./components/AddToDo/AddToDo.tsx";
import Header from "./components/Header/Header.tsx";
import ToDoList from "./components/ToDoList/ToDoList.tsx";

function App() {
  return (
    <div className="main">
      <Header></Header>
      <div className="content">
        <AddToDo></AddToDo>
        <ToDoList></ToDoList>
      </div>
    </div>
  );
}

export default App;
