import "./App.css";

import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Swap from "./components/Swap";
import Tokens from "./components/Tokens";

function App() {
  return (

    <div className="App">
      <Header />
      <div className="mainWindow">
        <Routes>
          <Route path="/" element={<Swap />} />
          <Route path="/tokens" element={<Tokens />} />
        </Routes>
      </div>

    </div>
  )
}

export default App;
