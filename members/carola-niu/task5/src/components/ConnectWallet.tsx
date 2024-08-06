import React from "react";
import { useConnect,useAccount,useDisconnect} from 'wagmi'

export function ConnectWallet() {
    const {address, isConnected} = useAccount()
    const {connectors,connect} = useConnect()
    const {disconnect} = useDisconnect()

    if (isConnected) {
        return (
            <div>
                <button onClick={()=>disconnect()}>Disconnect </button>
                <div>Connected as {address}</div>    
            </div>
        );
    }

    return (
        <div>
            {connectors.map((connector)=>(
                <button key={connector.uid} onClick={()=>connect({connector})}>
                    Connect with {connector.name}
                    <img src={connector.icon} alt={connector.name} style={{width: "20px"}}/>
                </button>
            ))}
        </div>
    );
}

export default ConnectWallet;