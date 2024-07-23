import "./App.css";
import Header from "./components/Header";
import Swap from "./components/Swap";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="mainWindow">
        <Swap />
      </div>
    </div>
  )
}

export default App;
