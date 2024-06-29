import './App.css'
import {ConnectButton} from "@rainbow-me/rainbowkit";

function App() {

    return (
        <>
            <h1 className="text-3xl font-bold">
                Hello world!
            </h1>
            <div>
                <ConnectButton showBalance={false}/>
            </div>
        </>
    )
}

export default App
