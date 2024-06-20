// include an entry point for the AddToDo component, and button to add a new todo item


import React, { useState } from "react";

function AddToDo({addTodo}: {addTodo: (text: string) => void}){
    
       const [input, setInput] = useState('');

       const handleSumbit = (e: React.FormEvent) =>{
              e.preventDefault();
              if(input.trim()){
              addTodo(input);
              setInput('');
         }
        };

        return (
            <form onSubmit={handleSumbit}>
                <input
                    type="text"
                    placeholder="Add a new todo"
                    value={input}
                    onChange={(e)=> setInput(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
        );
    }

    export default AddToDo;