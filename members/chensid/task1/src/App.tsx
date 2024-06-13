import "./App.css";
import Header from "@/components/Header";
import ToDoList from "@/components/ToDoList";
import AddToDo from "@/components/AddToDo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
type ToDo = {
  text: string;
  completed: boolean;
};
function App() {
  const [toDos, setToDos] = useState<ToDo[]>(() => {
    const storedToDos = localStorage.getItem("toDos");
    return storedToDos ? JSON.parse(storedToDos) : [];
  });
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);
  const deleteTodo = (index: number) => {
    const newToDos = toDos.filter((_, i) => i !== index);
    setToDos(newToDos);
  };
  const toggleComplete = (index: number) => {
    const newToDos = toDos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setToDos(newToDos);
  };

  const addTodo = (text: string) => {
    const newToDo = { text, completed: false };
    setToDos([...toDos, newToDo]);
  };

  return (
    <Card className="w-1/2 mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center">
          <Header />
        </CardTitle>
        <CardContent>
          <AddToDo addTodo={addTodo} />
          <ToDoList
            toDos={toDos}
            deleteTodo={deleteTodo}
            toggleComplete={toggleComplete}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default App;
