import { createContext, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";

const EthersContext = createContext(null);

export const EthersProvider = ({ children }) => {
    let [signer, setSigner] = useState(null);
    let [provider, setProvider] = useState(null);

    useEffect(() => {
        handleConnect();
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', handleConnect);
        }
    }, [])
      
    const handleConnect = async () => {
        if (window.ethereum === null) {
            console.log("MetaMask not installed; using read-only defaults");
            setProvider(ethers.getDefaultProvider());
        } else {
            const _provider = new ethers.BrowserProvider(window.ethereum);
            const _signer = await _provider.getSigner();
        
            setProvider(_provider);
            setSigner(_signer);
        }
    }

    return (
        <EthersContext.Provider value={{ provider, signer, handleConnect}}>
            {children}
        </EthersContext.Provider>
    )
}

export const useEthers = () => {
    return useContext(EthersContext);
}