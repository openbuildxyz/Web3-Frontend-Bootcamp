import "./styles.css";
import React, { useState, useEffect } from "react";

function Header() {
  return (
    <div className="Header">
      <h1>ToDo App</h1>
    </div>
  );
}

function Texx(hist, setHist) {
  const [texts, setText] = useState("");
  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const onClikc = () => {
    // const cuhist = hist.slice();
    setHist((prevHist) => [...prevHist, { texts, state: false }]);
    setText("");
  };

  return (
    <div className="texx">
      <input type="text" value={texts} onChange={handleInputChange} />
      <button onClick={onClikc}>Add</button>
    </div>
  );
}

function ListItem(listts, setLists) {
  const buttonScript = (listt) => {
    let descript;
    if (listt.state == true) {
      descript = "Finish";
    } else {
      descript = "UnFinish";
    }
    return descript;
  };

  const deleteState = (listt) => {
    setLists((prevItems) =>
      prevItems.filter((items) => items.texts != listt.texts)
    );
  };
  const modifyState = (listt) => {
    setLists((prevItems) =>
      prevItems.map((items) =>
        items.texts == listt.texts ? { ...items, state: !items.state } : items
      )
    );
  };

  return (
    <ul>
      {listts.map((listt) => (
        <li key={listt.texts}>
          {listt.texts}
          <button onClick={() => deleteState(listt)}>delete</button>
          <button onClick={() => modifyState(listt)}>
            {buttonScript(listt)}
          </button>
          {/* {ButtonS(listt, setLists)} */}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [todoitems, setItems] = useState(() => {
    const todosto = localStorage.getItem("todos");
    return todosto ? JSON.parse(todosto) : [];
  });

  const addItem = (text) => {
    setItems((preItem) => [...preItem, { texts, state: false }]);
  };
  const deleteItem = (index) => {
    setItems((preitems) =>
      preitems.filter((todoitems, todoitems_index) => todoitemsindex !== index)
    );
  };
  useEffect(() => {
    const savetodo = () => {
      localStorage.setItem("todos", JSON.stringify(todoitems));
    };
    savetodo();
  }, [todoitems]);

  return (
    <div>
      <Header></Header>
      {Texx(todoitems, setItems)}
      {ListItem(todoitems, setItems)}
    </div>
  );
}
