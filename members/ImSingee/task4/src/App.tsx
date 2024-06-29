import {Header} from "./Header.tsx";
import {NFTBoard} from "./NFTBoard.tsx";
import {ConnectedRequired} from "./ConnectedRequired.tsx";

function App() {
    return (
        <>
            <Header className="px-8 py-4"/>
            <main className="m-8 grid place-content-center h-max min-h-[60vh] text-center">
                <ConnectedRequired>
                    <NFTBoard/>
                </ConnectedRequired>
            </main>
        </>
    )
}

export default App
