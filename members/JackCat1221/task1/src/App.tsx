import "./App.css";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import TaskOne from "./task1/TaskOne";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Header />
      <div
        style={{
          overflow: "hidden",
          height: "calc(100vh - 80px)",
          display: "flex",
        }}
      >
        <div style={{ width: 240, height: "100%" }}>
          <Sidebar />
        </div>
        <div style={{ flex: 1 }}>{<TaskOne />}</div>
      </div>
    </div>
  );
}

export default App;
