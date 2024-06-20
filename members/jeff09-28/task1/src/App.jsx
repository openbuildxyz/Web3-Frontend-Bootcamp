import './App.css'
import Header from "./components/Header.jsx";
import {ToDoList} from "./components/ToDoList.jsx";

function App() {

    return (
        <>
            <div className="card">
                <Header/>
                <ToDoList></ToDoList>
            </div>
        </>
    )
}

export default App
