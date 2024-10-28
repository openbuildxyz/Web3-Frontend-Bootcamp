import "./App.css";
import Header from "./components/Header";
import Swap from "./components/Swap";
import { Routes, Route } from "react-router-dom";

function App() {

	return (

		<div className="App">
		<Header />
		<div className="mainWindow">
			<Routes>
			<Route path="/" element={<Swap />} />
			</Routes>
		</div>

		</div>
	)
}

export default App;
