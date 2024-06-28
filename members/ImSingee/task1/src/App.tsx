import './App.css'
import {Header} from "./Header.tsx";
import {TodoListProvider} from "./TodoListProvider.tsx";
import {ToDoList} from "./ToDoList.tsx";
import {AddToDo} from "./AddToDo.tsx";

function App() {
    return (
        <TodoListProvider>
            <div>
                <Header/>
                <ToDoList/>
                <AddToDo/>
            </div>
        </TodoListProvider>
    )
}

export default App
