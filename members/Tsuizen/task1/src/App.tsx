import { useState } from 'react';

import './index.css';

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <>
     
    </>
  );
}

export default App;
