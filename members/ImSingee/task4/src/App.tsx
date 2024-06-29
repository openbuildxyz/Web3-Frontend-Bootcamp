import {Header} from "./Header.tsx";
import {NFTBoard} from "./NFTBoard.tsx";
import {ConnectedRequired} from "./ConnectedRequired.tsx";
import {ListNewButton} from "./ListNewButton.tsx";

function App() {
    return (
        <>
            <Header className="px-8 py-4"/>
            <main className="m-8 grid place-content-center h-max min-h-[60vh] text-center">
                <ConnectedRequired>
                    <NFTBoard/>
                    <ListNewButton />
                </ConnectedRequired>
            </main>
        </>
    )
}

export default App
