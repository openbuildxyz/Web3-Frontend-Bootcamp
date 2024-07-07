import { useEffect, useState } from "react";
import PeddindComponent from "./componets/PeddindComponent.tsx";
import CompletedListComponen from "./componets/CompletedListComponen.tsx";
import Head from "./componets/Head.tsx";

function App() {
  const [peddindList, setPenddingList] = useState<string[]>([]);
  const [completedList, setCompletedList] = useState<string[]>([]);
  const [inputValue, setInputeValue] = useState("");

  useEffect(() => {
    localStorage.getItem("peddindList") &&
      setPenddingList(
        JSON.parse(localStorage.getItem("peddindList") as string)
      );
    localStorage.getItem("completedList") &&
      setCompletedList(
        JSON.parse(localStorage.getItem("completedList") as string)
      );
  }, []);

  window.onbeforeunload = function () {
    localStorage.setItem("peddindList", JSON.stringify(peddindList));
    localStorage.setItem("completedList", JSON.stringify(completedList));
  };

  function fulfillment(index: number) {
    const str = peddindList.splice(index, 1);
    setPenddingList([...peddindList]);
    setCompletedList([...completedList, ...str]);
  }
  function removePedding(index: number) {
    peddindList.splice(index, 1);
    setPenddingList([...peddindList]);
  }

  function regression(index: number) {
    const str = completedList.splice(index, 1);
    setCompletedList([...completedList]);
    setPenddingList([...peddindList, ...str]);
  }

  function removeCompleted(index: number) {
    completedList.splice(index, 1);
    setCompletedList([...completedList]);
  }

  return (
    <>
      <div style={{ width: "400px", margin: "0 auto" }}>
        <Head />
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputeValue(e.target.value);
            }}
          />
          <button
            onClick={() => {
              setPenddingList([...peddindList, inputValue]);
            }}
          >
            添加
          </button>
        </div>
        <div>
          <div>
            <h2>待办</h2>
            <PeddindComponent
              peddindList={peddindList}
              fulfillment={fulfillment}
              removePedding={removePedding}
            />
          </div>
          <div>
            <h2>已办</h2>
            <CompletedListComponen
              completedList={completedList}
              regression={regression}
              removeCompleted={removeCompleted}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
