import {PropsWithChildren} from "react";
import {useIsConnected} from "./hooks/useIsConnected.tsx";

export function ConnectedRequired({children}: PropsWithChildren) {
    const connected = useIsConnected()
    if (connected) {
        return <>{children}</>
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-3xl font-bold">Connect Wallet Required</h1>
            <p className="mt-4">Please connect your wallet to continue.</p>
        </div>
    )
}