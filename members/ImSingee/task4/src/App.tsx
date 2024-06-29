import {Header} from "./Header.tsx";
import {NFTBoard} from "./NFTBoard.tsx";

function App() {
    return (
        <>
            <Header className="px-8 py-4"/>
            <main className="m-8 grid place-content-center h-max min-h-[60vh] text-center">
                <NFTBoard/>
            </main>
        </>
    )
}

export default App
